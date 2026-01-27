import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DeleteAllService } from '@core/database/services/delete-all/delete-all.service';

@Injectable({ providedIn: 'root' })
export class DeleteAccountService {
	private readonly deleteAllService = inject(DeleteAllService);

	deleteAccount(): Observable<void> {
		return defer(() => from(this.deleteAllService.deleteAll()));
	}
}
