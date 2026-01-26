import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateChildFn, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { UserService } from '@core/database/services/user/user.service';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';

export const authGuard: CanActivateChildFn = () => {
	const authenticationService = inject(AuthenticationService);
	const userService = inject(UserService);
	const router = inject(Router);

	return firstValueFrom(
		toObservable(authenticationService.isAuthenticated).pipe(
			map((isAuthenticated) => {
				if (isAuthenticated) return true;

				return router.createUrlTree([userService.doesUserExist() ? '/login' : '/registration']);
			}),
		),
	);
};
