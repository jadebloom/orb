import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainService } from '@core/database/services/domain/domain.service';
import { Domain } from '@core/database/models/domain';

@Injectable({ providedIn: 'root' })
export class FetchAllDomainsService {
	private readonly domainService = inject(DomainService);

	fetchAllDomains(): Observable<Domain[]> {
		return defer(() => from(this.domainService.fetchAllDomains()));
	}
}
