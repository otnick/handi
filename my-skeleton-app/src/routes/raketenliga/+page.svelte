<script lang=ts>
    import { onMount } from 'svelte';

    let leagues = ['Bundesliga', 'Premier League', 'La Liga', 'Serie A', 'Ligue 1'];
    let newLeague = '';

    function addLeague() {
        if (newLeague.trim() !== '') {
            leagues = [...leagues, newLeague];
            newLeague = '';
        }
    }

    onMount(() => {
        // Fetch leagues from API or initialize with default values
    });
</script>

<section class="img-bg mt-28"/>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mt-48 mx-20">
    <h2 class="h2 col-span-full mb-10 ">Raketenligen</h2>
    {#each leagues as league}
    <a class="card p-4" href="/raketenliga/{league}">{league}</a>
    {/each}
    <button
        class="btn variant-filled col-span-full mt-10 mb-10"
        on:click={addLeague}
        >
        Neue Liga
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

    @media (min-width: 640px) {
        .card {
            flex: 1 1 50%;
            max-width: 75%;
        }
    }

    @media (min-width: 768px) {
        .card {
            flex: 1 1 33.33%;
            max-width: 75%;
        }
    }

    @media (min-width: 1024px) {
        .card {
            flex: 1 1 50%;
            max-width: 75%;
        }
    }
    .card:hover {
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