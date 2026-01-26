import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, Observable } from 'rxjs';
import { AuthenticationService } from '@core/auth/services/authentication/authentication.service';

@Injectable()
export class AuthenticationFormService {
	private readonly authenticationService = inject(AuthenticationService);

	readonly form = new FormGroup({
		password: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(64)],
		}),
	});

	readonly isAuthenticating = signal(false);

	authenticate(): Observable<void> {
		if (this.form.invalid || this.isAuthenticating()) return EMPTY;

		this.isAuthenticating.set(true);
		this.form.disable();

		return this.authenticationService
			.authenticate({ password: this.form.getRawValue().password })
			.pipe(
				finalize(() => {
					this.isAuthenticating.set(false);
					this.form.enable();
				}),
			);
	}
}
