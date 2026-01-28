import { TestBed } from '@angular/core/testing';

import { DeleteAllDomainsService } from './delete-all-domains.service';

describe('DeleteAllDomainsService', () => {
	let service: DeleteAllDomainsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(DeleteAllDomainsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
