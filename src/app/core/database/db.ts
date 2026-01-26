import { Dexie, Table } from 'dexie';
import { User } from '@core/database/models/user';

export class Database extends Dexie {
	user!: Table<User, number>;

	constructor() {
		super('Database');

		this.version(1).stores({ user: 'email, password' });
	}
}

export const database = new Database();
