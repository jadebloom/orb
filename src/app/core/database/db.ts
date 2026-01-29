import { Dexie, Table } from 'dexie';
import { User } from '@core/database/models/user';
import { Domain } from '@core/database/models/domain';
import { DomainGoal } from '@core/database/models/domain-goal';

export class Database extends Dexie {
	user!: Table<User, string>;
	domains!: Table<Domain, number>;
	domainGoals!: Table<DomainGoal, number>;

	constructor() {
		super('Database');

		this.version(1).stores({ user: 'email, password' });
		this.version(1).stores({ domains: '++id' });
		this.version(1).stores({ domainGoals: '++id, domainId' });
	}
}

export const database = new Database();
