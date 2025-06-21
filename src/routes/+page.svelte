<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { toast } from '@zerodevx/svelte-toast';
	import { db, type EcritureInput } from '../db';
	import EcritureListModal from './EcritureListModal.svelte';
	import dayjs from 'dayjs';
	import SaveModal from './SaveModal.svelte';
	import { onMount } from 'svelte';

	/**
	 * 今現在表示しているエクリチュールがIndexedDBに保存済みのものを編集した場合、そのID
	 */
	let ecritureId: number | undefined = undefined;
	/**
	 * エクリチュールの消失度合のカウンタ
	 */
	const vanishCount = new Spring(0);
	/**
	 * この値を超えるとエクリチュールは完全に消失する。
	 */
	const maxVanishCount = 300;
	/**
	 * 消失のアニメーションのコールバックのリクエストのID。キャンセルのために必要。
	 */
	let animationRequestId: number | undefined;
	/**
	 * エクリチュールを消失させるアニメーションを開始する。
	 */
	const vanishEcriture = () => {
		if (vanishCount.current >= maxVanishCount) {
			editingState = editingState.change("", true);
		}
		vanishCount.target += 1;
		animationRequestId = requestAnimationFrame(vanishEcriture);
	};
	/**
	 * エクリチュールを消失させるアニメーションのキャンセル。
	 */
	const cancelVanish = () => {
		if (animationRequestId) {
			cancelAnimationFrame(animationRequestId);
		}
	};
	/**
	 * 消失をキャンセルして、元の状態に戻す。
	 */
	const resetVanish = () => {
		cancelVanish();
		vanishCount.target = 0;
	}

	class EditingState {
		private _body: string;
		get body() {
			return this._body;
		}
		private _editing: boolean;
		get editing() {
			return this._editing;
		}
		constructor(body: string, editing: boolean) {
			this._body = body;
			this._editing = editing;
		}
		change(body: string, editing: boolean): EditingState {
			this._body = body;
			this._editing = editing;
			return this;
		}
	};

	/**
	 * エクリチュールが空で編集中の状態。
	 */
	class Empty extends EditingState {
		change(body: string, editing: boolean): EditingState {
			if (!editing) {
				return new NonEditing(body, editing);
			}
			// エクリチュールが空で亡くなった場合は、エクリチュールの消失を開始する。
			if (body.length > 0) {
				vanishEcriture();
				return new Progress(body, editing);
			}
			return super.change(body, editing);;
		}
	};

	/**
	 * エクリチュールが空ではなく、編集中の状態
	 */
	class Progress extends EditingState {
		change(body: string, editing: boolean): EditingState {
			// 編集中でなくなった場合、消失をキャンセル。
			if (!editing) {
				cancelVanish();
				return new NonEditing(body, editing);
			}
			// エクリチュールが空になった場合、消失をリセット
			if (body.length === 0) {
				resetVanish();
				ecritureId = undefined;
				return new Empty(body, editing);
			}
			// エクリチュールの内容に変化が起きた場合、消失をリセットして、消失を再開する。
			resetVanish();
			vanishEcriture();
			return super.change(body, editing);
		}
	};

	class NonEditing extends EditingState {
		change(body: string, editing: boolean): EditingState {
			if (!editing) {
				return super.change(body, editing);
			}
			if (body.length === 0) {
				return new Empty(body, editing);
			}
			// 編集中に変化し、エクリチュールに中身がある場合、消失を開始する。
			vanishEcriture();
			return new Progress(body, editing);
		}
	}
	let editingState = new Empty("", true);
	let title = '無題';
	let minSize = 400;
	let maxSize = 800;

	const changeEditing = (editing: boolean) => {
		editingState = editingState.change(editingState.body, editing);
	}
	let ecritureListModal: EcritureListModal;
	let saveModal: SaveModal;
	const create = async ({title, minSize, maxSize, body}: EcritureInput) => {
		try {
			const now = dayjs();
			const nowString = now.format();
			await db.ecritures.add({
				title,
				minSize,
				maxSize,
				body,
				createdAt: nowString,
				modifiedAt: nowString,
			});
			ecritureCount += 1;
			toast.push('新規保存しました。');
		} catch (error) {
			console.warn(error);
		}
	}
	const update = async ({title, minSize, maxSize, body}: EcritureInput) => {
		try {
			const now = dayjs();
			const nowString = now.format();
			await db.ecritures.update(ecritureId!, (ecriture) => {
				ecriture.title = title;
				ecriture.minSize = minSize;
				ecriture.maxSize = maxSize;
				ecriture.body = body;
				ecriture.modifiedAt = nowString;
			});
			toast.push('上書き保存しました。');
		} catch (error) {
			console.warn(error);
		}
	}
	let ecritureCount = 0;
	onMount(async () => {
		ecritureCount = await db.ecritures.count();
	})
</script>

<svelte:head>
	<title>Écriture ちょっと待ってくれよ</title>
	<meta name="description" content="書き続けないと、文章が消えていくエディタで、エクリチュール・オートマティックが体験できるwebアプリ" />
</svelte:head>


<div class="editor">
	<h1>Écriture ちょっと待ってくれよ</h1>
	<div class="input">
		<label for="title">タイトル:</label>
		<input type="text" id="title" bind:value={title} />
	</div>
	<div class="input">
		<span>目標文字数:</span>
		<input type="number" id="min-size" aria-label="下限文字数" title="下限文字数" bind:value={minSize} />
		~
		<input type="number" id="max-size" aria-label="上限文字数" title="上限文字数" bind:value={maxSize} />
	</div>
	<div>
		<label for="editting">編集中:</label>
		<input type="checkbox" id="editting" checked={editingState.editing} onchange={(event) => {
			editingState = editingState.change(editingState.body, event.currentTarget.checked);
		}} />
	</div>
	<div>
		<textarea
			value={editingState.body}
			onkeydown={(event) => {
				editingState = editingState.change(event.currentTarget.value, editingState.editing);
			}}
			style="color: rgba(0, 0, 0, {(maxVanishCount - vanishCount.current) / maxVanishCount}"
			rows="10"
			placeholder="止まらずに、書き続けろ……"
			readonly={!editingState.editing}
		></textarea>
	</div>
	{#if editingState.body.length > 0}
	<button
		type="button"
		onclick={async () => {
			if (ecritureId === undefined) {
				create({title, minSize, maxSize, body: editingState.body});
			} else {
				saveModal.open();
			}
		}}>保存</button
	>
	{/if}
	{#if ecritureCount > 0}<button type="button" onclick={ecritureListModal.open}>一覧</button>{/if}
</div>
<EcritureListModal
	onSelect={async (ecriture) => {
		try {
			title = ecriture.title;
			minSize = ecriture.minSize;
			maxSize = ecriture.maxSize;
			ecritureId = ecriture.id;
			editingState = editingState.change(ecriture.body, false);
		} catch (error) {
			console.warn(error);
		}
	}}
	onRemove={() => {
		ecritureCount -= 1;
	}}
	{changeEditing}
	bind:this={ecritureListModal}
/>
<SaveModal
	ecriture={{
		title,
		minSize,
		maxSize,
		body: editingState.body,
	}}
	{create}
	{update}
	{changeEditing}
	bind:this={saveModal}
/>


<style>
	.input {
		margin-bottom: 4px;
	}
	.input input {
		border-width: 1px;
		border-color: gray;
		border-style: thin;
		border-radius: 2px;
	}
	.editor textarea {
		width: 100%;
		height: 60vh;
		resize: none;
		border-width: 2px;
		border-color: gray;
		border-style: thin;
		border-radius: 4px;
		padding: 4px;
	}
</style>
