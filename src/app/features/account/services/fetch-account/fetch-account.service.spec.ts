import { TestBed } from '@angular/core/testing';

import { FetchAccountService } from './fetch-account.service';

describe('FetchAccountService', () => {
	let service: FetchAccountService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FetchAccountService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
