<script lang="ts">
	import { type EcritureInput } from '../db';

	type Props = {
		ecriture: EcritureInput;
		create: (ecriture: EcritureInput) => Promise<void>;
		update: (ecriture: EcritureInput) => Promise<void>;
		changeEditing: (editing: boolean) => void;
	};

	let { ecriture, create, update, changeEditing, }: Props = $props();

	let dialog: HTMLDialogElement;
	export const open = async () => {
		if (!dialog.open) {
			changeEditing(false);
			document.body.style.overflow = 'hidden';
			dialog.showModal();
		}
	};
	const closeDialog = () => {
		if (dialog.open) {
			document.body.style.overflow = '';
			dialog.close();
			changeEditing(true);
		}
	};
	const keyDownClose = (event: KeyboardEvent) => {
		if (event.code === 'Escape') {
			closeDialog();
		}
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
		<h2>{ecriture.title}を上書き保存しますか？</h2>
		<div class="actions">
        	<button
            	type="button"
            	onclick={async () => {
					await update(ecriture);
					closeDialog();
				}}>上書き保存</button>
        	<button
            	type="button"
            	onclick={async () => {
					await create(ecriture);
					closeDialog();
				}}>新規作成</button>
			<button
				type="button"
				onclick={closeDialog}>キャンセル</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		background-color: white;
		padding: 4px;
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
	.actions button {
 	   border: 1px solid #ccc;
    	background: #fafafa;
	    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
	}
</style>
