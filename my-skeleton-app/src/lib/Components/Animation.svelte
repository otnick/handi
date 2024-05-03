<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import * as THREE from 'three';
    import waternormals from '$lib/assets/waternormals.jpg';
    import Stats from 'three/addons/libs/stats.module.js';
    import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { Water } from 'three/addons/objects/Water.js';
    import { Sky } from 'three/addons/objects/Sky.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { fetchFisch } from '$lib/api';

    let fische: any;
   
    let scene: any, camera: any, renderer: any;
    let controls: any, water: any, sun: any, mesh: any;
    let container: any, stats: any;
    let mixer: any;


    const HERINGPATH = "/hering.glb";
  
    function init() {

        container = document.getElementById( 'container' );
        

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5;
        container.appendChild( renderer.domElement );

        //

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        camera.position.set( 30, 30, 100 );

        //

        sun = new THREE.Vector3();

        // Water

        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load( waternormals, function ( texture ) {

                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                } ),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );

        water.rotation.x = - Math.PI / 2;

        scene.add( water );

        // Hering
        const loader = new GLTFLoader();
        for (let fisch of fische) {
            console.log(fisch);
        loader.load(
            HERINGPATH, // Pfad zum GLB-Modell
            function ( gltf: any ) {
                // Das Modell wurde erfolgreich geladen
                const fish = gltf.scene;
                fish.position.set( 20, 20, 10 );
                fish.scale.set( 5, 5, 5 );
                scene.add( fish );
                moveFish(fish);

                mixer = new THREE.AnimationMixer(fish);

                const amimations = gltf.animations;

                const clip = amimations[0];

                const action = mixer.clipAction(clip);

                action.setEffectiveTimeScale(2);

                action.play();

            },
            undefined,
            function ( error: any ) {
                console.error( 'Fehler beim Laden des Fischmodells:', error );
            }
        );
        }
        console.log("loader", loader);

        // Skybox

        const sky = new Sky();
        sky.scale.setScalar( 10000 );
        scene.add( sky );

        const skyUniforms = sky.material.uniforms;

        skyUniforms[ 'turbidity' ].value = 10;
        skyUniforms[ 'rayleigh' ].value = 2;
        skyUniforms[ 'mieCoefficient' ].value = 0.005;
        skyUniforms[ 'mieDirectionalG' ].value = 0.8;

        const parameters = {
            elevation: 2,
            azimuth: 180
        };

        const pmremGenerator = new THREE.PMREMGenerator( renderer );
        const sceneEnv = new THREE.Scene();

        let renderTarget: any;

        function updateSun() {

            const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
            const theta = THREE.MathUtils.degToRad( parameters.azimuth );

            sun.setFromSphericalCoords( 1, phi, theta );

            sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
            water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

            if ( renderTarget !== undefined ) renderTarget.dispose();

            sceneEnv.add( sky );
            renderTarget = pmremGenerator.fromScene( sceneEnv );
            scene.add( sky );

            scene.environment = renderTarget.texture;

        }

        updateSun();

        //

        const geometry = new THREE.BoxGeometry( 30, 20, 30 );
        const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        //

        controls = new OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set( 0, 10, 0 );
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();

        //

        stats = new Stats();
        container.appendChild( stats.dom );

        // GUI

        const gui = new GUI();

        const folderSky = gui.addFolder( 'Sky' );
        folderSky.add( parameters, 'elevation', 0, 90, 0.1 ).onChange( updateSun );
        folderSky.add( parameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSun );
        folderSky.open();

        const waterUniforms = water.material.uniforms;

        const folderWater = gui.addFolder( 'Water' );
        folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
        folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' );
        folderWater.open();

        //

        window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    }

    let lastUpdateTime = 0;
    const updateInterval = 100; // Aktualisierung alle 100 Millisekunden

    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
        if(mixer){
            update();
        }
    }

    function update() {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastUpdateTime;

        if (deltaTime >= updateInterval) {
            mixer.update(deltaTime * 0.001); // deltaTime in Sekunden umwandeln
            lastUpdateTime = currentTime;
        }
    }

    function render() {

    const time = performance.now() * 0.001;

    mesh.position.y = Math.sin( time ) * 20 + 5;
    mesh.rotation.x = time * 0.5;
    mesh.rotation.z = time * 0.51;

    water.material.uniforms[ 'time' ].value += 1.0 / 600.0;

    renderer.render( scene, camera );

    }

    function moveFish(fish: any) {
    const moveSpeed = 0.1;
    const moveInterval = 10;
    const minWaitTime = 1000; // Minimum wait time in milliseconds
    const maxWaitTime = 10000; // Maximum wait time in milliseconds

    const move = () => {
        const randomX = Math.random() * (100 - (-100)) - 100;
        const randomY = Math.random() * (100 - (-100)) - 100;
        const randomZ = Math.random() * (100 - (-100)) - 100;

        const moveOnce = () => {
            if (fish.position.x < randomX) {
                fish.position.x += moveSpeed;
            }
            if (fish.position.y < randomY) {
                fish.position.y += moveSpeed;
            }
            if (fish.position.z < randomZ) {
                fish.position.z += moveSpeed;
            }

            // Check if fish reached random destination
            if (fish.position.x >= randomX && fish.position.y >= randomY && fish.position.z >= randomZ) {
                const waitTime = Math.random() * (maxWaitTime - minWaitTime) + minWaitTime;
                setTimeout(move, waitTime);
                return;
            }

            setTimeout(moveOnce, moveInterval);
        };

        moveOnce();
    };

    move();
}

    onMount(async () => {
            fische = await fetchFisch();
            init();
            animate();
        });
  
    onDestroy(() => {
      // Aufräumen, wenn die Komponente zerstört wird
    });
  </script>
  
  <style>
    /* Hier könntest du CSS-Stile für deine Szene definieren */
    #scene-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
  <div id="container"></div>
   