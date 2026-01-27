import { Dexie, Table } from 'dexie';
import { User } from '@core/database/models/user';

export class Database extends Dexie {
	user!: Table<User, string>;

	constructor() {
		super('Database');

		this.version(1).stores({ user: 'email' });
	}
}

export const database = new Database();
