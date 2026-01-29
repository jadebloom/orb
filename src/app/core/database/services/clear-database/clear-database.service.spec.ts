import { TestBed } from '@angular/core/testing';

import { ClearDatabaseService } from './clear-database.service';

describe('ClearDatabaseService', () => {
	let service: ClearDatabaseService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ClearDatabaseService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
