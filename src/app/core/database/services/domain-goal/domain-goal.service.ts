import { Injectable } from '@angular/core';
import { database } from '@core/database/db';
import { DomainGoalTargetValueUnit } from '@core/database/enums/domain-goal-target-value-unit';
import { CreateDomainGoalPayload } from '@core/database/models/create-domain-goal-payload';
import { DomainGoal } from '@core/database/models/domain-goal';

@Injectable({ providedIn: 'root' })
export class DomainGoalService {
	async createDomainGoal(payload: CreateDomainGoalPayload): Promise<DomainGoal> {
		if (!payload.name) throw new Error("Domain goal's name must not be null or empty");

		if (
			payload.unit == DomainGoalTargetValueUnit.BOOLEAN &&
			!'01'.includes('' + payload.targetValue)
		) {
			throw new Error("Domain goal's targetValue must be 0 or 1 if the unit is boolean");
		}

		const goalId = await database.domainGoals.add({
			name: payload.name,
			targetValue: payload.targetValue,
			unit: payload.unit,
			domainId: payload.domainId,
		});

		return this.fetchDomainGoalById(goalId);
	}

	async fetchDomainGoalsByDomainId(domainId: number): Promise<DomainGoal[]> {
		return database.domainGoals.where('domainId').equals(domainId).toArray();
	}

	async fetchDomainGoalById(goalId: number): Promise<DomainGoal> {
		const goal = await database.domainGoals.get(goalId);

		if (!goal) throw new Error(`Domain goal with ID ${goalId} wasn't found`);

		return goal;
	}

	async deleteAllDomainGoalsByDomainId(domainId: number): Promise<void> {
		await database.domainGoals.where('domainId').equals(domainId).delete();
	}
}
