<script lang="ts">
    import { Spring } from 'svelte/motion';
    import { toast } from '@zerodevx/svelte-toast'
    import { db } from "../../db";
    import LoadModal from './LoadModal.svelte';

    const count = new Spring(0);
    const maxCount = 300;

    let animationRequestId: number | undefined;
    let title = "無題";
    let targetSize = 400;
    let body = '';
    const cancelVanish = () => {
        if (animationRequestId) {
            cancelAnimationFrame(animationRequestId);
        }
    }
    const vanishText = () => {
        if (body.length === 0) {
            count.target = 0;
            cancelVanish();
        }
        if (count.current >= maxCount) {
            body = '';
            count.target = 0;
            cancelVanish();
        }
        count.target += 1;
        animationRequestId = requestAnimationFrame(vanishText);
    }
    let loadModal: LoadModal;
</script>

<div class="editor">
    <h1>Écriture ちょっと待ってくれよ</h1>
    <div class="input">
        <label for="title">タイトル:</label>
        <input type="text" id="title" bind:value={title} />
    </div>
    <div class="input">
        <label for="target-size">目標文字数:</label>
        <input type="number" id="target-size" bind:value={targetSize} />
    </div>
    <div>
        <textarea
            bind:value={body}
            style="color: rgba(0, 0, 0, {(maxCount - count.current) / maxCount}"
            onkeyup={() => {
                count.target = 0;
                cancelVanish();
                vanishText();
            }}
            rows="10"
            cols="50"
            placeholder="止まらずに、書き続けろ……">
        </textarea>
    </div>
    <button type="button" onclick={async () => {
        try {
            await db.ecritures.add({
                title,
                targetSize,
                body,
            });
            toast.push("保存しました。")
        } catch (error) {
            console.warn(error);
        }
    }}>保存</button>
    <button type="button" onclick={loadModal.open}>一覧</button>
</div>
<LoadModal 
    onSelect={async (ecriture) => {
        try {
            title = ecriture.title;
            targetSize = ecriture.targetSize;
            body = ecriture.body;
        } catch (error) {
            console.warn(error);
        }
    }}
    vanishText={vanishText}
    cancelVanish={cancelVanish}
    bind:this={loadModal} />
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
        border-width: 2px;
        border-color: gray;
        border-style: thin;
        border-radius: 4px;
        padding: 4px;
    }
</style>