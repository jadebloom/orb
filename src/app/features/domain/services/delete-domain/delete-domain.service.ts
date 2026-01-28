import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { DomainService } from '@core/database/services/domain/domain.service';

@Injectable({ providedIn: 'root' })
export class DeleteDomainService {
	private readonly domainService = inject(DomainService);

	deleteDomainById(domainId: number): Observable<void> {
		return defer(() => from(this.domainService.deleteDomainById(domainId)));
	}
}
