import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, map, Observable } from 'rxjs';
import { RegistrationService } from '@core/security/services/registration/registration.service';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';
import { User } from '@core/security/models/user';

@Injectable()
export class RegistrationFormService {
	private readonly registrationService = inject(RegistrationService);
	private readonly authenticationService = inject(AuthenticationService);

	readonly form = new FormGroup({
		email: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email, Validators.maxLength(32)],
		}),
		password: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(32)],
		}),
	});

	readonly isRegistrating = signal(false);

	register(): Observable<User> {
		if (this.form.invalid || this.isRegistrating()) return EMPTY;

		this.isRegistrating.set(true);
		this.form.disable();

		const body = this.form.getRawValue();

		return this.registrationService.register({ email: body.email, password: body.password }).pipe(
			map((user) => {
				this.authenticationService.authenticate();

				return user;
			}),
			finalize(() => {
				this.isRegistrating.set(false);
				this.form.enable();
			}),
		);
	}
}
