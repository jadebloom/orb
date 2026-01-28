import { TestBed } from '@angular/core/testing';

import { FetchDomainService } from './fetch-domain.service';

describe('FetchDomainService', () => {
	let service: FetchDomainService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FetchDomainService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
