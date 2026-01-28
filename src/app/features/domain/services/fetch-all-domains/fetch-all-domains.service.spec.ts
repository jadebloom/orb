import { TestBed } from '@angular/core/testing';

import { FetchAllDomainsService } from './fetch-all-domains.service';

describe('FetchAllDomainsService', () => {
	let service: FetchAllDomainsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FetchAllDomainsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
