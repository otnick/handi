<script lang="ts">
    import { RangeSlider } from '@skeletonlabs/skeleton';
    
	export let showModal: boolean; // boolean

	let dialog: any; // HTMLDialogElement

    let max = 150;
    let length = 50;

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
            <select class="select">
                <option value="1">Hecht</option>
                <option value="2">Zander</option>
                <option value="3">Barsch</option>
                <option value="4">Karpfen</option>
            </select>
        </label>
        <label class="label mt-3">
            <span class="font-bold">Angler</span>
            <select class="select">
                <option value="1">Nick</option>
                <option value="2">Jo</option>
            </select>
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
        <span class="flex justify-between">
            <button autofocus on:click={() => dialog.close()}>Close</button>
            <button autofocus on:click={() => dialog.close()}>Speichern</button>
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
</style>
