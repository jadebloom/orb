import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainGoalService } from '@core/database/services/domain-goal/domain-goal.service';
import { CreateDomainGoalPayload } from '@core/database/models/create-domain-goal-payload';
import { DomainGoal } from '@core/database/models/domain-goal';

@Injectable({ providedIn: 'root' })
export class CreateDomainGoalService {
	private readonly domainGoalService = inject(DomainGoalService);

	createDomainGoal(payload: CreateDomainGoalPayload): Observable<DomainGoal> {
		return defer(() => from(this.domainGoalService.createDomainGoal(payload)));
	}
}
