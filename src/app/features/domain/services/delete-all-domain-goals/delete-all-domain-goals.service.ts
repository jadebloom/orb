import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainGoalService } from '@core/database/services/domain-goal/domain-goal.service';

@Injectable({ providedIn: 'root' })
export class DeleteAllDomainGoalsService {
	private readonly domainGoalService = inject(DomainGoalService);

	deleteAllDomainGoalsByDomainId(domainId: number): Observable<void> {
		return defer(() => from(this.domainGoalService.deleteAllDomainGoalsByDomainId(domainId)));
	}
}
