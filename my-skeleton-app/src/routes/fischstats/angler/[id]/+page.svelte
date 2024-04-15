<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchFischart, fetchFisch, createFisch, fetchAngler, deleteAngler } from '$lib/api';
    import type { IFischart, IFisch, IAngler, IRekord } from '$lib/types';
    import { page } from '$app/stores';
    import Backlight from '$lib/Components/Backlight.svelte';

    let anglers: any;

    let angler: IAngler = {
        id: 0,
        name: '',
        fische: [],
        koeder: 0,
    };

    let fische: IFisch[] = [];

    let anglerFisches: IFisch[] = [];

    onMount(async () => {
        let arten = await fetchFischart();
        console.log(arten);
        let fische = await fetchFisch();
        console.log(fische);
        anglers = await fetchAngler();
        console.log(anglers);
        angler = anglers.find((a: IAngler) => a.id === anglerId);
        anglerFisches = fische.filter((f: IFisch) => angler.fische.includes(f.id));
        anglerFisches = anglerFisches.map((f: IFisch) => {
            f.fischart = arten.find((a: IFischart) => a.id === f.fischart)?.name;
            return f;
        });
        console.log(anglerFisches);
    });

    let anglerId: any = $page.params.id;
    anglerId = parseInt(anglerId);
    console.log(anglerId);
</script>

<Backlight />
<div class="card p-4 mt-10 mx-10">
    <h1 class="h2 font-bold">Angler: {angler.name} Köder: {angler.koeder}</h1>
    <p> Gefangene Fische:</p>
    {#each anglerFisches as fisch}
        <p class="font-bold">{fisch.fischart}</p>
        <p class="font-bold">{fisch.laenge} cm</p>
        <p class="font-bold">{fisch.ort}</p>
    {/each}
</div>