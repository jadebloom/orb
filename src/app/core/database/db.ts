import { Dexie, Table } from 'dexie';
import { User } from '@core/database/models/user';
import { Domain } from '@core/database/models/domain';
import { Goal } from '@core/database/models/goal';

export class Database extends Dexie {
	user!: Table<User, string>;
	domains!: Table<Domain, number>;
	goals!: Table<Goal, number>;

	constructor() {
		super('Database');

		this.version(1).stores({ user: 'email, password' });
		this.version(1).stores({ domains: '++id' });
		this.version(1).stores({ goals: '++id' });
	}
}

export const database = new Database();
