import { TestBed } from '@angular/core/testing';

import { FetchAllDomainGoalsService } from './fetch-all-domain-goals.service';

describe('FetchAllDomainGoalsService', () => {
	let service: FetchAllDomainGoalsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FetchAllDomainGoalsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
