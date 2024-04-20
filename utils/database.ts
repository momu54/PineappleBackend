import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { SQL } from 'sql-template-strings';

interface Owner {
	id: string;
	blocked: 1 | 0;
}

export enum ReviewMode {
	Unchecked,
	Checked,
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

	public GetOwners(mode: ReviewMode) {
		return super.all<Owner[]>(
			mode === ReviewMode.Checked
				? `SELECT * FROM Owner WHERE checked = 0`
				: `SELECT * FROM Owner WHERE checked = 1`
		);
	}

	public MarkOwnerBlocked(ownerID: string, blocked: boolean) {
		return super.run(
			SQL`UPDATE Owner SET blocked = ${blocked ? 1 : 0} WHERE id = ${ownerID}`
		);
	}

	public MarkOwnerChecked(ownerID: string, checked: boolean) {
		return super.run(
			SQL`UPDATE Owner SET checked = ${checked ? 1 : 0} WHERE id = ${ownerID}`
		);
	}
}

export const database = await OnTimifyDatabase.init();
