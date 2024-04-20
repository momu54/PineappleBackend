import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { SQL } from 'sql-template-strings';

interface Owner {
	id: string;
	blocked: 1 | 0;
}

class OnTimifyDatabase extends Database {
	private constructor() {
		super({
			filename: './database/data.db',
			driver: sqlite3.Database,
		});
	}

	public static async init() {
		const database = new this();
		await database.open();
		return database;
	}

	public GetOwner(ownerID: string) {
		return super.get<Owner>(SQL`SELECT * FROM Owner WHERE id = ${ownerID}`);
	}

	public AddOwner(ownerID: string) {
		return super.run(SQL`INSERT INTO Owner(id) VALUES (${ownerID})`);
	}
}

export const database = await OnTimifyDatabase.init();
