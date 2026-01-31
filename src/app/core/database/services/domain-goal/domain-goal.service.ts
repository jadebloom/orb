import { Injectable } from '@angular/core';
import { database } from '@core/database/db';
import { CreateDomainGoalPayload } from '@core/database/models/create-domain-goal-payload';
import { DomainGoal } from '@core/database/models/domain-goal';
import { UpdateDomainGoalPayload } from '@core/database/models/update-domain-goal-payload';

@Injectable({ providedIn: 'root' })
export class DomainGoalService {
	async createDomainGoal(payload: CreateDomainGoalPayload): Promise<DomainGoal> {
		if (!payload.name) throw new Error("Domain goal's name must not be null or empty");

		if (payload.isGoalBoolean && payload.targetValue != 0 && payload.targetValue != 1) {
			throw new Error("Domain goal's targetValue must be 0 or 1 if the unit is boolean");
		}

		const domainGoalId = await database.domainGoals.add({
			name: payload.name,
			targetValue: payload.targetValue,
			isGoalBoolean: payload.isGoalBoolean,
			domainId: payload.domainId,
		});

		return this.fetchDomainGoalByDomainGoalId(domainGoalId);
	}

	async fetchAllDomainGoalsByDomainId(domainId: number): Promise<DomainGoal[]> {
		const domainGoals = await database.domainGoals.where('domainId').equals(domainId).toArray();

		return domainGoals;
	}

	async fetchDomainGoalByDomainGoalId(domainGoalId: number): Promise<DomainGoal> {
		const goal = await database.domainGoals.get(domainGoalId);

		if (!goal) throw new Error(`Domain goal with ID ${domainGoalId} wasn't found`);

		return goal;
	}

	async updateDomainGoal(
		domainGoalId: number,
		payload: UpdateDomainGoalPayload,
	): Promise<DomainGoal> {
		return await database.transaction('rw', database.domainGoals, async () => {
			this.fetchDomainGoalByDomainGoalId(domainGoalId);

			await database.domainGoals.where('id').equals(domainGoalId).modify({
				name: payload.name,
				isGoalBoolean: payload.isGoalBoolean,
				targetValue: payload.targetValue,
				domainId: payload.domainId,
			});

			return this.fetchDomainGoalByDomainGoalId(domainGoalId);
		});
	}

	async deleteAllDomainGoalsByDomainGoalId(domainGoalId: number): Promise<void> {
		await database.domainGoals.where('id').equals(domainGoalId).delete();
	}

	async deleteAllDomainGoalsByDomainId(domainId: number): Promise<void> {
		await database.domainGoals.where('domainId').equals(domainId).delete();
	}
}
