import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectRegistrationGuardGuard } from './protect-registration-guard-guard';

describe('protectRegistrationGuardGuard', () => {
	const executeGuard: CanActivateFn = (...guardParameters) =>
		TestBed.runInInjectionContext(() => protectRegistrationGuardGuard(...guardParameters));

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it('should be created', () => {
		expect(executeGuard).toBeTruthy();
	});
});
