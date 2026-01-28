import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainService } from '@core/database/services/domain/domain.service';
import { CreateDomainPayload } from '@core/database/models/create-domain-payload';
import { Domain } from '@core/database/models/domain';

@Injectable({ providedIn: 'root' })
export class CreateDomainService {
	private readonly domainService = inject(DomainService);

	createDomain(payload: CreateDomainPayload): Observable<Domain> {
		return defer(() => from(this.domainService.createDomain(payload)));
	}
}
