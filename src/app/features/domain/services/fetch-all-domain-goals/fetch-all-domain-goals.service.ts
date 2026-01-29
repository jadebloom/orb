import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainGoalService } from '@core/database/services/domain-goal/domain-goal.service';
import { DomainGoal } from '@core/database/models/domain-goal';

@Injectable({ providedIn: 'root' })
export class FetchAllDomainGoalsService {
	private readonly domainGoalService = inject(DomainGoalService);

	fetchAllGoalsByDomainId(domainId: number): Observable<DomainGoal[]> {
		return defer(() => from(this.domainGoalService.fetchDomainGoalsByDomainId(domainId)));
	}
}
