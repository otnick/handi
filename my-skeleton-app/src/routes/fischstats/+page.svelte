<script lang=ts>
    import { onMount } from 'svelte';
    import { fetchFischart, fetchFisch, createFisch } from '$lib/api';
    import type { IFischart, IFisch, IAngler, IRekord } from '$lib/types';

    let fisch: IFisch = {
        id: 2,
        name: 'Barsch',
        laenge: 20,
        ort: 'Lienen Kanal',
        art: {
                id: 3,
                name: 'Barsch',
            },
    }

    let arten: IFischart[] = [];
    let fische: IFisch[] = []
    

    onMount(async () => {
        arten = await fetchFischart();
        console.log(arten);
        fische = await fetchFisch();
        console.log(fische);
    });


</script>

    <section class="img-bg mt-28"/>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mx-20">
        <h2 class="h2 col-span-full mt-10">Rekorde</h2>
        {#each arten as art}
        <a class="card card-2 p-4" href="/raketenliga/{art.name}">{art.name}</a>
        {/each}
    <h2 class="h2 col-span-full mt-10">Letzte Fische</h2>
    <div class="card col-span-full">
        <div class="grid grid-cols-3 gap-4">
            {#each fische as fisch}
            <div class="flex flex-col items-center">
                <p class="font-bold">{fisch.name}</p>
                <p>{fisch.laenge} cm</p>
                <p>{fisch.ort}</p>
            </div>
            {/each}
        </div>
    </div>
    <h2 class="h2 col-span-full mt-10">Angler</h2>
    <button
        class="btn variant-filled col-span-2 mt-10 mb-10"
        on:click={() => createFisch(fisch)}
        >
        Neuer Fisch
    </button>
    <button
        class="btn variant-filled col-span-2 mt-10 mb-10"
        >
        Neuer Angler
    </button>
</div>



<style scoped>
    .img-bg {
        @apply w-64 h-64 md:w-80 md:h-80;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .img-bg {
        @apply absolute z-[-1] rounded-full blur-[50px] transition-all;
        animation: pulse 10s cubic-bezier(0, 0, 0, 0.1) infinite,
            glow 5s ease infinite;
    }
    @keyframes glow {
        0% {
            @apply bg-primary-400/50;
        }
        33% {
            @apply bg-secondary-400/50;
        }
        66% {
            @apply bg-tertiary-400/50;
        }
        100% {
            @apply bg-primary-400/50;
        }
    }
    @keyframes pulse {
        50% {
            transform: translate(-50%, -80%) scale(1.5);
        }
    }

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

    @media (min-width: 640px) {
        .card-2 {
            flex: 1 1 50%;
            max-width: 75%;
        }
    }

    @media (min-width: 768px) {
        .card-2 {
            flex: 1 1 33.33%;
            max-width: 75%;
        }
    }

    @media (min-width: 1024px) {
        .card-2 {
            flex: 1 1 50%;
            max-width: 75%;
        }
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