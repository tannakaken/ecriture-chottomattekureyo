import Dexie, {type EntityTable} from "dexie";

type Ecriture = {
    /**
     * primary key
     */
    id: number;
    title: string;
    targetSize: number;
    body: string;
}

const db = new Dexie('EcritureDatabase') as Dexie & {
    ecritures: EntityTable<Ecriture, 'id'>;
};

db.version(1).stores({
    ecritures: '++id, title, targetSize, body',
});

export type { Ecriture };
export { db };
