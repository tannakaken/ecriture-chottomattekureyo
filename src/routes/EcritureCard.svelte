<script lang="ts">
    import type { Ecriture } from "../db";
    type Props = {
		ecriture: Ecriture;
		select: (ecriture: Ecriture) => Promise<void>;
		remove: (ecriture: Ecriture) => Promise<void>;
	};

	let { ecriture, select, remove }: Props = $props();
</script>

<div class="ecriture-card">
    <h3>{ecriture.title}</h3>
    <div class="meta">
        <div>作成日: {ecriture.createdAt}</div>
        <div>変更日: {ecriture.modifiedAt}</div>
    </div>
    <div class="actions">
        <button
            type="button"
            onclick={() => {
                select(ecriture)
            }}>ロード</button>
        <button
            type="button"
            onclick={() => {
                remove(ecriture)
            }}>削除</button>
    </div>
</div>

<style>
.ecriture-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    background: #fafafa;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.ecriture-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
}
.ecriture-card .meta {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
    display: flex;
    gap: 1rem;
}
.ecriture-card .actions button {
    border: 1px solid #ccc;
    background: #fafafa;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
