import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private readonly _isAuthenticated = signal(false);
	readonly isAuthenticated = this._isAuthenticated.asReadonly();

	authenticate() {
		this._isAuthenticated.set(true);
	}

	logout() {
		this._isAuthenticated.set(false);
	}
}
