import { TestBed } from '@angular/core/testing';

import { CreateDomainService } from './create-domain.service';

describe('CreateDomainService', () => {
	let service: CreateDomainService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateDomainService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
