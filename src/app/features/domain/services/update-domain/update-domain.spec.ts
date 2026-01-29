import { TestBed } from '@angular/core/testing';

import { UpdateDomain } from './update-domain';

describe('UpdateDomain', () => {
	let service: UpdateDomain;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UpdateDomain);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
