<script lang=ts>
    import { onMount } from 'svelte';
    import { fetchFischart, fetchFisch, createFisch, fetchAngler } from '$lib/api';
    import type { IFischart, IFisch, IAngler, IRekord } from '$lib/types';
    import NeuerAngler from '$lib/Modals/NeuerAngler.svelte';
    import NeuerFisch from '$lib/Modals/NeuerFisch.svelte';
	import { filter } from '@skeletonlabs/skeleton';
    import Backlight from '$lib/Components/Backlight.svelte';

    let showModal = false;

    let fisch: IFisch = {
        laenge: 30,
        ort: 'Lienen Kanal',
        fischart: 3,
        id: 0,
    }

    let arten: IFischart[] = [];
    let fische: IFisch[] = []

    let anglers: IAngler[] = [];
    

    onMount(async () => {
        arten = await fetchFischart();
        console.log(arten);
        fische = await fetchFisch();
        console.log(fische);
        anglers = await fetchAngler();
        console.log(anglers);
    });


</script>

    <NeuerFisch bind:showModal />
    <Backlight />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mx-20">
        <h2 class="h2 col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-4 mt-10">Rekorde</h2>
        {#each arten as art}
        <a class="card card-2 p-4 col-span-4 sm:col-span-2 md:col-span-1 lg:col-span-1" href="/fischstats/{art.name}">{art.name}</a>
        {/each}
        <h2 class="h2 col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-4 mt-10">Letzte Fische</h2>
        {#each fische as fisch}
        <a class="card card-2 p-4 col-span-4 sm:col-span-2 md:col-span-1 lg:col-span-1" href="/fischstats/fisch/{fisch.id}/">
            <div class="flex flex-col items-center">
                <p class="font-bold">{arten.find(art => art.id === fisch.fischart)?.name}</p>
                <p>{fisch.laenge} cm</p>
                <p>{fisch.ort}</p>
                <p>{anglers.find(angler => angler.fische.includes(fisch.id))?.name}</p>
            </div>
        </a>
        {/each}
        <h2 class="h2 col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-4 mt-10">Angler</h2>
        {#each anglers as angler}
        <a class="card card-2 p-4 col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-2  " href="/fischstats/angler/{angler.id}">
            <div class="flex flex-col items-center">
                <p class="font-bold">{angler.name}</p>
                <p>Fische: {angler.fische.length}</p>
                <p>Verlorene Köder: {angler.koeder}</p>
            </div>
        </a>
        {/each}
    </div>
    <div class="sticky bottom-0 flex justify-around">
        <button
            class="btn variant-filled col-span-2 mt-10 mb-10 font-bold"
            on:click={() => (showModal = true)}
        >
            Neuer Fisch
        </button>
        <button
            class="btn variant-filled col-span-2 mt-10 mb-10 font-bold"
        >
            Neuer Angler
        </button>
    </div>



<style scoped>

    .card {
        @apply p-4 text-center rounded-lg shadow-md w-full;
        background-color: var(--color-primary-400);
        color: var(--color-primary-50);
        flex: 1 1 100%;
        max-width: 100%;
    }

    .card-2 {
        @apply p-4 text-center rounded-lg shadow-md w-full;
        background-color: var(--color-primary-400);
        color: var(--color-primary-50);
        flex: 1 1 100%;
        max-width: 100%;
    }

    
    .card-2:hover {
        @apply bg-primary-500;
    }

    .btn {
        @apply w-1/4 p-4 text-center rounded-lg shadow-md;
    }

    @media (max-width: 639px) {
        .btn {
            min-width: 150px;
        }
    }

    .h2 {
        @apply text-3xl font-bold;
    }
    </style>