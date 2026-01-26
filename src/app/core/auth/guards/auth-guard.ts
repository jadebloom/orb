import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateChildFn, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { AuthenticationService } from '@core/auth/services/authentication/authentication.service';

export const authGuard: CanActivateChildFn = () => {
	const authenticationService = inject(AuthenticationService);
	const router = inject(Router);

	return firstValueFrom(
		toObservable(authenticationService.isAuthenticated).pipe(
			map((isAuthenticated) =>
				isAuthenticated ? true : router.createUrlTree(['/authentication']),
			),
		),
	);
};
