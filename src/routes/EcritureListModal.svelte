<script lang="ts">
	import { db, type Ecriture } from '../db';
	import close from '$lib/images/close.svg';
	import EcritureCard from './EcritureCard.svelte';

	type Props = {
		onSelect: (ecriture: Ecriture) => Promise<void>;
		onRemove: () => void;
		/**
		 * テクスト消失を一時停止する。
		 */
		pause: () => void;
		/**
		 * テクスト消失を元の状態に戻す（もともとが止まっていたら止まったまま。もともとは動いていたら再開する）。
		 */
		resume: () => void;
	};

	let { onSelect, onRemove, pause, resume }: Props = $props();

	let dialog: HTMLDialogElement;
	let ecritures: Ecriture[] = $state([]);
	export const open = async () => {
		if (dialog.open) {
			return;
		}
		pause();
		try {
			ecritures = await db.ecritures.toArray();
		} catch (error) {
			console.warn(error);
		}
		document.body.style.overflow = 'hidden';
		dialog.showModal();
	};
	const closeDialog = () => {
		if (dialog.open) {
			document.body.style.overflow = '';
			dialog.close();
			resume();
		}
	};
	const keyDownClose = (event: KeyboardEvent) => {
		if (event.code === 'Escape') {
			closeDialog();
		}
	};
	const select = async (ecriture: Ecriture) => {
		await onSelect(ecriture);
		closeDialog();
	};
	const remove = async (ecriture: Ecriture) => {
		await db.ecritures.delete(ecriture.id);
		if (ecritures.length === 1) {
			closeDialog();
		} else {
			ecritures = ecritures.filter((item) => item.id !== ecriture.id);
		}
		onRemove();
	};
</script>

<svelte:window on:keydown={keyDownClose} />
<dialog
	bind:this={dialog}
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
		<div class="modal-header">
			<h2>保存された文書一覧</h2>
			<button type="button" class="close-button" onclick={closeDialog}>
				<img class="close-icon" src={close} alt="閉じる" title="閉じる" />
			</button>
		</div>
		<ul class="item-list">
			{#each ecritures as ecriture}
				<li class="ecriture">
					<EcritureCard {ecriture} {select} {remove} />
				</li>
			{/each}
		</ul>
	</div>
</dialog>

<style>
	.item-list {
		list-style: none;
	}
	dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		background-color: white;
		padding: 4px;
		border-radius: 4px;
		animation: fade-out 0.7s ease-out;
	}

	dialog[open] {
		animation: fade-in 0.7s ease-out;
	}

	dialog[open]::backdrop {
		animation: backdrop-fade-in 0.7s ease-out forwards;
	}
	@keyframes fade-in {
		0% {
			opacity: 0;
			scale: 0.5;
			display: none;
		}

		100% {
			opacity: 1;
			scale: 1;
			display: block;
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			scale: 1;
			display: block;
		}

		100% {
			opacity: 0;
			scale: 0.5;
			display: none;
		}
	}

	@keyframes backdrop-fade-in {
		0% {
			background-color: rgb(0 0 0 / 0%);
		}

		100% {
			background-color: rgb(0 0 0 / 25%);
		}
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin: 1px;
		display: flex;
		align-items: center;
		transition: rotate 0.2s ease, opacity 0.2s ease;
	}

	.close-button:hover {
		opacity: 0.7;
		rotate: 90deg;
	}
</style>
