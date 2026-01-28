import { Injectable } from '@angular/core';
import { database } from '@core/database/db';
import { CreateDomainPayload } from '@core/database/models/create-domain-payload';
import { Domain } from '@core/database/models/domain';

@Injectable({ providedIn: 'root' })
export class DomainService {
	async createDomain(payload: CreateDomainPayload): Promise<Domain> {
		const domainId = await database.domains.add({
			name: payload.name,
			color: payload.color,
			createdAt: new Date(),
		});

		return this.fetchDomain(domainId);
	}

	async fetchDomain(domainId: number): Promise<Domain> {
		const domain = await database.domains.where('id').equals(domainId).first();

		if (domain == null) throw new Error(`Domain with ID ${domainId} wasn't found`);

		return domain;
	}

	async deleteAllDomains(): Promise<void> {
		await database.domains.clear();
	}
}
