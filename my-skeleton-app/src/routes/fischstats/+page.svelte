<script lang=ts>
    import { onMount } from 'svelte';
    import { fetchFischart } from '$lib/api';

    const arten = fetchFischart();

    let fische = ['Hecht', 'Zander', 'Aal', 'Karpfen', 'Brasse'];
    let newLeague = '';
    let lastFische = [
        {
            name: 'Hecht',
            length: '1,20m',
            weight: '5kg',
            angler: 'Nick'
        },
        {
            name: 'Zander',
            length: '1,10m',
            weight: '4kg',
            angler: 'Tom'
        },
        {
            name: 'Aal',
            length: '0,80m',
            weight: '2kg',
            angler: 'Max'
        },
        {
            name: 'Karpfen',
            length: '1,50m',
            weight: '6kg',
            angler: 'Moritz'
        },
        {
            name: 'Brasse',
            length: '0,40m',
            weight: '1kg',
            angler: 'Lukas'
        }
    ]

    function addLeague() {
        if (newLeague.trim() !== '') {
            fische = [...fische, newLeague];
            newLeague = '';
        }
    }

    onMount(() => {
        // Fetch leagues from API or initialize with default values
        fetchFischart().then((data: any) => {
            fische = data;
            console.log(fische);
        });
    });


</script>

<section class="img-bg mt-28"/>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mx-20">
    <h2 class="h2 col-span-full mt-10">Rekorde</h2>
    {#each fische as fisch}
    <a class="card card-2 p-4" href="/raketenliga/{fisch}">{fisch}</a>
    {/each}
    <h2 class="h2 col-span-full mt-10">Letzte Fische</h2>
    <div class="card card col-span-full">
        <div class="grid grid-cols-3 gap-4">
            {#each lastFische as fisch}
            <div class="flex flex-col items-center">
                <p class="font-bold">{fisch.name}</p>
                <p>{fisch.length} {fisch.weight}</p>
                <p>{fisch.angler}</p>
            </div>
            {/each}
        </div>
    </div>
    <h2 class="h2 col-span-full mt-10">Angler</h2>
    <button
        class="btn variant-filled col-span-2 mt-10 mb-10"
        on:click={addLeague}
        >
        Neuer Fisch
    </button>
    <button
        class="btn variant-filled col-span-2 mt-10 mb-10"
        on:click={addLeague}
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