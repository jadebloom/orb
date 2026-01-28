import { TestBed } from '@angular/core/testing';

import { CreateDomainFormService } from './create-domain-form.service';

describe('CreateDomainFormService', () => {
	let service: CreateDomainFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateDomainFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
