import Dexie, { type EntityTable } from 'dexie';

type EcritureInput = {
	title: string;
	minSize: number;
	maxSize: number;
	body: string;
}

type Ecriture = EcritureInput & {
	/**
	 * primary key
	 */
	id: number;
	createdAt: string;
	modifiedAt: string;
};

const db = new Dexie('EcritureDatabase') as Dexie & {
	ecritures: EntityTable<Ecriture, 'id'>;
};

db.version(1).stores({
	ecritures: '++id, title, targetSize, body, createdAt, modifiedAt'
});

export type { EcritureInput, Ecriture };
export { db };
