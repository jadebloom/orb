import { TestBed } from '@angular/core/testing';

import { DeleteDomainGoalService } from './delete-domain-goal.service';

describe('DeleteDomainGoalService', () => {
	let service: DeleteDomainGoalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DeleteDomainGoalService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
