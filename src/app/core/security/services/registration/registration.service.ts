import { inject, Injectable } from '@angular/core';
import { defer, from, Observable, throwError } from 'rxjs';
import { UserService } from '@core/database/services/user/user.service';
import { User } from '@core/database/models/user';
import { RegistrationPayload } from '@core/security/models/registration-payload';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
	private readonly userService = inject(UserService);

	register(payload: RegistrationPayload): Observable<User> {
		if (this.userService.doesUserExist()) {
			return throwError(() => new Error('You already have an account'));
		}

		return defer(() => from(this.userService.createUser(payload)));
	}
}
