import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { ClearDatabaseService } from '@core/database/services/clear-database/clear-database.service';

@Injectable({ providedIn: 'root' })
export class DeleteAccountService {
	private readonly clearDatabaseService = inject(ClearDatabaseService);

	deleteAccount(): Observable<void> {
		return defer(() => from(this.clearDatabaseService.clearDatabase()));
	}
}
