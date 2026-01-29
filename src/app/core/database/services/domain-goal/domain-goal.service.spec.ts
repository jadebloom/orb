import { TestBed } from '@angular/core/testing';

import { DomainGoalService } from './domain-goal.service';

describe('DomainGoalService', () => {
	let service: DomainGoalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DomainGoalService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
