import { TestBed } from '@angular/core/testing';

import { CreateDomainGoalService } from './create-domain-goal.service';

describe('CreateDomainGoalService', () => {
	let service: CreateDomainGoalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateDomainGoalService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
