import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainGoalService } from '@core/database/services/domain-goal/domain-goal.service';
import { UpdateDomainGoalPayload } from '@core/database/models/update-domain-goal-payload';
import { DomainGoal } from '@core/database/models/domain-goal';

@Injectable({ providedIn: 'root' })
export class UpdateDomainGoalService {
	private readonly domainGoalService = inject(DomainGoalService);

	updateDomainGoal(domainGoalId: number, payload: UpdateDomainGoalPayload): Observable<DomainGoal> {
		return defer(() => from(this.domainGoalService.updateDomainGoal(domainGoalId, payload)));
	}
}
