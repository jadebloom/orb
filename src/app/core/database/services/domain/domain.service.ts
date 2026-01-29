import { Injectable } from '@angular/core';
import { database } from '@core/database/db';
import { CreateDomainPayload } from '@core/database/models/create-domain-payload';
import { Domain } from '@core/database/models/domain';
import { UpdateDomainPayload } from '@core/database/models/update-domain-payload';

@Injectable({ providedIn: 'root' })
export class DomainService {
	async createDomain(payload: CreateDomainPayload): Promise<Domain> {
		const domainId = await database.domains.add({
			name: payload.name,
			color: payload.color,
			createdAt: new Date(),
		});

		return this.fetchDomainById(domainId);
	}

	async fetchAllDomains(): Promise<Domain[]> {
		return await database.domains.toArray();
	}

	async fetchDomainById(domainId: number): Promise<Domain> {
		const domain = await database.domains.where('id').equals(domainId).first();

		if (domain == null) throw new Error(`Domain with ID ${domainId} wasn't found`);

		return domain;
	}

	async updateDomain(domainId: number, payload: UpdateDomainPayload): Promise<Domain> {
		if (!payload.name || !payload.color) {
			throw new Error("Domain's name and color must not be null or empty");
		}

		const domain = await database.domains.get(domainId);

		if (!domain) throw new Error(`Domain with ID ${domainId} wasn't found`);

		await database.domains
			.where('id')
			.equals(domainId)
			.modify({ name: payload.name, color: payload.color });

		return this.fetchDomainById(domainId);
	}

	async deleteAllDomains(): Promise<void> {
		await database.domains.clear();
	}

	async deleteDomainById(domainId: number): Promise<void> {
		await database.domains.delete(domainId);
	}
}
