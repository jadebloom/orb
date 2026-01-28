import { TestBed } from '@angular/core/testing';

import { DeleteDomainService } from './delete-domain.service';

describe('DeleteDomainService', () => {
	let service: DeleteDomainService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DeleteDomainService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
