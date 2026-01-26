import { inject, Injectable } from '@angular/core';
import { defer, from, Observable, throwError } from 'rxjs';
import { UserService } from '@core/database/services/user/user.service';
import { User } from '@core/database/models/user';
import { LoginPayload } from '@core/security/models/login-payload';

@Injectable({ providedIn: 'root' })
export class LoginService {
	private readonly userService = inject(UserService);

	login(payload: LoginPayload): Observable<User> {
		if (!this.userService.doesUserExist()) {
			return throwError(() => new Error('You should first create an account'));
		}

		return defer(() => from(this.userService.verifyUser(payload.password)));
	}
}
