import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, map, Observable } from 'rxjs';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';
import { LoginService } from '@core/security/services/login/login.service';
import { User } from '@core/security/models/user';

@Injectable()
export class LoginFormService {
	private readonly loginService = inject(LoginService);
	private readonly authenticationService = inject(AuthenticationService);

	readonly form = new FormGroup({
		password: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(32)],
		}),
	});

	readonly isLogining = signal(false);

	login(): Observable<User> {
		if (this.form.invalid || this.isLogining()) {
			this.form.markAllAsTouched();

			return EMPTY;
		}

		this.isLogining.set(true);
		this.form.disable();

		const body = this.form.getRawValue();

		return this.loginService.login({ password: body.password }).pipe(
			map((user) => {
				this.authenticationService.authenticate();

				return user;
			}),
			finalize(() => {
				this.isLogining.set(false);
				this.form.enable();
			}),
		);
	}
}
