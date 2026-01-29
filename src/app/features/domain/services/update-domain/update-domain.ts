import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainService } from '@core/database/services/domain/domain.service';
import { UpdateDomainPayload } from '@core/database/models/update-domain-payload';
import { Domain } from '@core/database/models/domain';

@Injectable({ providedIn: 'root' })
export class UpdateDomain {
	private readonly domainService = inject(DomainService);

	updateDomain(domainId: number, payload: UpdateDomainPayload): Observable<Domain> {
		return defer(() => from(this.domainService.updateDomain(domainId, payload)));
	}
}
