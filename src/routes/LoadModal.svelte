<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { db, type Ecriture } from '../db';

	type Props = {
		onSelect: (ecriture: Ecriture) => Promise<void>;
		vanishText: () => void;
		cancelVanish: () => void;
	};

	let { onSelect, vanishText, cancelVanish }: Props = $props();

	let dialog: HTMLDialogElement;
	onMount(() => {
		dialog = document.getElementById('load-dialog') as HTMLDialogElement;
	});
	let ecritures: Ecriture[] = $state([]);
	export const open = async () => {
		cancelVanish();
		try {
			ecritures = await db.ecritures.toArray();
		} catch (error) {
			console.warn(error);
		}
		document.body.style.overflow = 'hidden';
		dialog.showModal();
	};
	const closeDialog = () => {
		document.body.style.overflow = '';
		dialog.close();
		vanishText();
	};
	const keyDownClose = (event: KeyboardEvent) => {
		if (event.code === 'Escape') {
			closeDialog();
		}
	};
</script>

<svelte:window on:keydown={keyDownClose} />
<dialog
	id="load-dialog"
	transition:fade
	onclick={({ clientX, clientY }) => {
		const { top, left, width, height } = dialog.getBoundingClientRect();
		const inDialog =
			top <= clientY && clientY <= top + height && left <= clientX && clientX <= left + width;
		if (!inDialog) {
			closeDialog();
		}
	}}
>
	<div class="modal-content">
		<h2>保存された文書一覧</h2>
		{#each ecritures as ecriture}
			<li>
				{ecriture.title}
				<button
					type="button"
					onclick={async () => {
						await onSelect(ecriture);
						cancelVanish();
						closeDialog();
					}}>ロード</button
				>
				<button
					type="button"
					onclick={async () => {
						await db.ecritures.delete(ecriture.id);
						ecritures = await db.ecritures.toArray();
					}}>削除</button
				>
			</li>
		{/each}
		<button onclick={closeDialog}>close</button>
	</div>
</dialog>

<style>
	dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
	}
</style>
