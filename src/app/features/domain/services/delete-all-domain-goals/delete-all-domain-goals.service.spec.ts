import { TestBed } from '@angular/core/testing';

import { DeleteAllDomainGoalsService } from './delete-all-domain-goals.service';

describe('DeleteAllDomainGoalsService', () => {
	let service: DeleteAllDomainGoalsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DeleteAllDomainGoalsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
