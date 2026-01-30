import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainGoalService } from '@core/database/services/domain-goal/domain-goal.service';

@Injectable({ providedIn: 'root' })
export class DeleteDomainGoalService {
	private readonly domainGoalService = inject(DomainGoalService);

	deleteDomainGoalByDomainId(domainGoalId: number): Observable<void> {
		return defer(() =>
			from(this.domainGoalService.deleteAllDomainGoalsByDomainGoalId(domainGoalId)),
		);
	}
}
