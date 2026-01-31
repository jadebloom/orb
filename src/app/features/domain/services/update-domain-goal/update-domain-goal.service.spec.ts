import { TestBed } from '@angular/core/testing';

import { UpdateDomainGoalService } from './update-domain-goal.service';

describe('UpdateDomainGoalService', () => {
	let service: UpdateDomainGoalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UpdateDomainGoalService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
