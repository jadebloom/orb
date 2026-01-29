import { TestBed } from '@angular/core/testing';

import { UpdateDomainFormService } from './update-domain-form.service';

describe('UpdateDomainFormService', () => {
	let service: UpdateDomainFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UpdateDomainFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
