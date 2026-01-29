import { TestBed } from '@angular/core/testing';

import { CreateDomainGoalFormService } from './create-domain-goal-form.service';

describe('CreateDomainGoalFormService', () => {
	let service: CreateDomainGoalFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateDomainGoalFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
