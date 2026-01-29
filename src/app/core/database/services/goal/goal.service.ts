import { Injectable } from '@angular/core';
import { database } from '@core/database/db';
import { CreateGoalPayload } from '@core/database/models/create-goal-payload';
import { Goal } from '@core/database/models/goal';

@Injectable({ providedIn: 'root' })
export class GoalService {
	async createGoal(payload: CreateGoalPayload): Promise<Goal> {
		const goalId = await database.goals.add({
			name: payload.name,
			targetValue: payload.targetValue,
			unit: payload.unit,
			domainId: payload.domainId,
		});

		return this.fetchGoalById(goalId);
	}

	async fetchGoalsByDomainId(domainId: number): Promise<Goal[]> {
		return database.goals.where('domainId').equals(domainId).toArray();
	}

	async fetchGoalById(goalId: number): Promise<Goal> {
		const goal = await database.goals.get(goalId);

		if (!goal) throw new Error(`Goal with ID ${goalId} wasn't found`);

		return goal;
	}
}
