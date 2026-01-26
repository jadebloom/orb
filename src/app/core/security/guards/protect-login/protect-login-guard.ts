import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@core/database/services/user/user.service';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';

export const protectLoginGuardGuard: CanActivateFn = () => {
	const userService = inject(UserService);
	const authenticationService = inject(AuthenticationService);
	const router = inject(Router);

	if (authenticationService.isAuthenticated()) {
		return router.createUrlTree(['/']);
	}

	return userService.doesUserExist() ? true : router.createUrlTree(['/registration']);
};
