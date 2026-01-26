import { inject, Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FeatureFlagService } from '@core/feature-flag/services/feature-flag.service';
import { AuthenticationPayload } from '@core/auth/models/authentication-payload';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private readonly featureFlagService = inject(FeatureFlagService);

	private readonly _isAuthenticated = signal(false);
	readonly isAuthenticated = this._isAuthenticated.asReadonly();

	authenticate(payload: AuthenticationPayload): Observable<void> {
		if (this.featureFlagService.isFlagEnabled('isAppDemo')) {
			return this.demoAuthenticate();
		}

		return this.fullAuthenticate(payload);
	}

	private demoAuthenticate(): Observable<void> {
		this._isAuthenticated.set(true);

		return of(void 0).pipe(delay(500));
	}

	private fullAuthenticate(payload: AuthenticationPayload): Observable<void> {
		console.warn(payload);

		this._isAuthenticated.set(true);

		return of(void 0).pipe(delay(500));
	}
}
