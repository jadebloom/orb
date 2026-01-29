import { Injectable } from '@angular/core';
import { database } from '@core/database/db';

@Injectable({ providedIn: 'root' })
export class ClearDatabaseService {
	async clearDatabase(): Promise<void> {
		await database.transaction(
			'rw',
			database.user,
			database.domains,
			database.domainGoals,
			async () => {
				await database.user.clear();
				await database.domains.clear();
				await database.domainGoals.clear();
			},
		);
	}
}
