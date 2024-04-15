<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchFischart, fetchFisch, createFisch, fetchAngler, deleteAngler, deleteFish } from '$lib/api';
    import type { IFischart, IFisch, IAngler, IRekord } from '$lib/types';
    import { page } from '$app/stores';
    import Backlight from '$lib/Components/Backlight.svelte';

    let anglers: any;

    let fisch: IFisch = {
        id: 0,
        laenge: 0,
        ort: '',
        fischart: 0,
    };

    let fischName: string = '';

    let angler: any;

    let fische: IFisch[] = [];

    let anglerFisches: IFisch[] = [];

    onMount(async () => {
        let arten = await fetchFischart();
        console.log("arten", arten);
        let fische = await fetchFisch();
        console.log("fische", fische);
        anglers = await fetchAngler();
        console.log("anglers", anglers);
        fisch = fische.find((f: IFisch) => f.id === fischId);
        fischName = arten.find((a: IFischart) => a.id === fisch.fischart)?.name;
        angler = anglers.find((a: IAngler) => a.fische.includes(fisch.id));
        console.log("angler", angler);
    });

    async function deleteAllFisch() {
        console.log("lösche alle Fische");
        fische = await fetchFisch();
        for (let f of fische) {
            await deleteFish(f.id);
            console.log("gelöscht", f.id);
        }
    }

    let fischId: any = $page.params.id;
    fischId = parseInt(fischId);
    console.log(fischId);
</script>
<Backlight />
<div class="card p-4 mt-10 mx-10">
    <h1 class="h2 font-bold">Fisch: {fischName}</h1>
    <button class="btn" on:click={() => deleteFish(fisch.id)}>Löschen</button>
</div>