import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DomainBusService {
	private readonly fetchAllDomainsSubject = new Subject<void>();

	readonly fetchAllDomains$ = this.fetchAllDomainsSubject.asObservable();

	triggerFetchAllDomains() {
		this.fetchAllDomainsSubject.next();
	}
}
