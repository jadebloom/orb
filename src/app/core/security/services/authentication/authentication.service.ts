import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '@core/database/services/user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private readonly userService = inject(UserService);

	private readonly _isAuthenticated = signal(false);
	readonly isAuthenticated = this._isAuthenticated.asReadonly();

	authenticate() {
		this._isAuthenticated.set(true);

		this.userService.updateLastLoggedIn();
	}

	logout() {
		this._isAuthenticated.set(false);
	}
}
