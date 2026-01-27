import { TestBed } from '@angular/core/testing';

import { DeleteAllService } from './delete-all.service';

describe('DeleteAllService', () => {
	let service: DeleteAllService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DeleteAllService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
