import { TestBed } from '@angular/core/testing';

import { DomainBusService } from './domain-bus.service';

describe('DomainBusService', () => {
	let service: DomainBusService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DomainBusService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
