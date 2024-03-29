<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2 font-bold">handi</h2>
		<!-- Animated Logo -->
		<figure>
			<section class="img-bg mt-28" />
			<img
				src={gnomechild}
				alt="gnomechild"
				height="320"
				width="320"
			/>
		</figure>
		<!-- / -->
		<div class="flex justify-center space-x-2">
			<a
				class="btn variant-filled mb-10"
				href="/raketenliga"
				rel="noreferrer"
			>
				Raketen Liga
			</a>
			<a
				class="btn variant-filled mb-10"
				href="/fischstats"
				rel="noreferrer"
				>
				Fischstats
			</a>
		</div>
	</div>
</div>

<script lang="ts">
	import gnomechild from '$lib/assets/gnomechild.png';
</script>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
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
			transform: scale(1.5);
		}
	}
</style>
