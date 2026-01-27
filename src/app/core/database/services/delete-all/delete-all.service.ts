import { Injectable } from '@angular/core';
import { database } from '@core/database/db';

@Injectable({ providedIn: 'root' })
export class DeleteAllService {
	async deleteAll(): Promise<void> {
		await database.user.clear();

		return;
	}
}
