import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectLoginGuardGuard } from './protect-login-guard';

describe('protectLoginGuardGuard', () => {
	const executeGuard: CanActivateFn = (...guardParameters) =>
		TestBed.runInInjectionContext(() => protectLoginGuardGuard(...guardParameters));

	beforeEach(() => {
		TestBed.configureTestingModule({});
	});

	it('should be created', () => {
		expect(executeGuard).toBeTruthy();
	});
});
