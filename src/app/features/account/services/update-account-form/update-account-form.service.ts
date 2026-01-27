import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, Observable } from 'rxjs';
import { User } from '@core/database/models/user';
import { UpdateAccountService } from '@features/account/services/update-account/update-account.service';

@Injectable({ providedIn: 'root' })
export class UpdateAccountFormService {
	private readonly updateAccountService = inject(UpdateAccountService);

	readonly isUpdating = signal(false);

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

	updateAccount(): Observable<User> {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return EMPTY;
		}

		if (this.isUpdating()) return EMPTY;

		this.isUpdating.set(true);
		this.form.disable();

		const body = this.form.getRawValue();

		return this.updateAccountService
			.updateAccount({ email: body.email, password: body.password })
			.pipe(
				finalize(() => {
					this.isUpdating.set(false);
					this.form.enable();
				}),
			);
	}
}
