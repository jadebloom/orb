import { TestBed } from '@angular/core/testing';

import { UpdateDomainGoalFormService } from './update-domain-goal-form.service';

describe('UpdateDomainGoalFormService', () => {
	let service: UpdateDomainGoalFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UpdateDomainGoalFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
