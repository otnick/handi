<script lang="ts">
    import { RangeSlider } from '@skeletonlabs/skeleton';
	import { fetchFischart, fetchFisch, createFisch, fetchAngler, patchAngler } from '$lib/api';
    import type { IFischart, IFisch, IAngler, IRekord } from '$lib/types';
	import { onMount } from 'svelte';
    
	export let showModal: boolean; // boolean

	let dialog: any; // HTMLDialogElement

    let max = 150;
    let length = 50;

	let fisch: IFisch = { id: 0, fischart: 0, laenge: 0, ort: '' };

	let angler: IAngler;

    let arten: IFischart[] = [];
    let fisches: IFisch[] = []

    let anglers: IAngler[] = [];
    

    onMount(async () => {
		console.log('Modal');
        arten = await fetchFischart();
        console.log('Modal', arten);
        fisches = await fetchFisch();
        // console.log('Modal', fische);
        anglers = await fetchAngler();
        console.log('Modal', anglers);
    });

	async function saveFisch() {
		fisch.ort = dialog.querySelector('input').value;
		fisch.laenge = length;
		fisch.fischart = dialog.querySelector('#artSelect').value;
		console.log('saveFisch', fisch);
		await createFisch(fisch);

		fisches = await fetchFisch();

		const selectedAnglerId = dialog.querySelector('#anglerSelect').value;
		console.log('selectedAnglerId', selectedAnglerId);

		const selectedAngler = anglers.find((a) => a.id == selectedAnglerId);
		console.log('selectedAngler', selectedAngler);

		if (selectedAngler) {
			selectedAngler.fische = selectedAngler.fische || []; // Initialize if undefined
			selectedAngler.fische.push(fisches[fisches.length-1].id);
			await patchAngler(selectedAngler);
		} else {
			console.error('Selected angler not found!');
		}

		dialog.close();
	}

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
        <p class="font-bold">Neuer Fisch</p>
		<hr />
        <label class="label mt-3">
            <span class="font-bold">Fischart</span>
            <select class="select" id="artSelect">
				{#each arten as art}
                <option class="option" value="{art.id}">{art.name}</option>
				{/each}
            </select>
        </label>
        <label class="label mt-3">
            <span class="font-bold">Angler</span>
            <select class="select" id="anglerSelect">
				{#each anglers as angler}
                <option class="option" value="{angler.id}">{angler.name}</option>
				{/each}
            </select>
        </label>
		<label class="label">
			<span class="font-bold">Ort</span>
			<input class="input" type="text" placeholder="Ort, Gewässer" />
		</label>
		<RangeSlider name="range-slider" bind:value={length} max={150} step={1}>
			<div class="flex justify-between items-center mt-3">
				<div class="font-bold">Länge</div>
				<div class="text-xs">{length} cm</div>
			</div>
		</RangeSlider>
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
        <span class="flex justify-between mt-2">
            <button autofocus on:click={() => dialog.close()}>Close</button>
            <button autofocus on:click={() => saveFisch()}>Speichern</button>
        </span>
	</div>
</dialog>

<style>
	dialog {
		max-width: 16em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
        width: 50% ;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}

	.select{
		color: rgb(0, 0, 0);
		background-color: rgba(25, 29, 28, 0.315);
	}
	.option{
		color: rgb(0, 0, 0);
		background-color: rgba(25, 29, 28, 0.315);
	}
	.input{
		color: rgb(0, 0, 0);
		background-color: rgba(25, 29, 28, 0.315);
	}
</style>
