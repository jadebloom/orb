import { TestBed } from '@angular/core/testing';

import { BooleanStateService } from './boolean-state.service';

describe('BooleanStateService', () => {
	let service: BooleanStateService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BooleanStateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
