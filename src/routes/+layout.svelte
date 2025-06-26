<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<div>
			<div>created by: <a href="https://tannakaken.xyz" target="_blank">tannakaken</a>,</div>
			<div>powered by: <a href="https://svelte.jp/" target="_blank">SvelteKit/Svelte</a>,</div>
			<div>@copyleft; All Wrongs Reversed.</div>
		</div>
	</footer>
</div>
<SvelteToast />

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer div div {
			display: inline;
		}
	}
</style>
