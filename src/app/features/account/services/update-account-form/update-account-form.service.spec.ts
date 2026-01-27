import { TestBed } from '@angular/core/testing';

import { UpdateAccountFormService } from './update-account-form.service';

describe('UpdateAccountFormService', () => {
	let service: UpdateAccountFormService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UpdateAccountFormService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
