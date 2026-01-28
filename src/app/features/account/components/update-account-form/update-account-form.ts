import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EmailInput } from '@core/security/components/email-input/email-input';
import { PasswordInput } from '@core/security/components/password-input/password-input';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { UpdateAccountFormService } from '@features/account/services/update-account-form/update-account-form.service';
import { FetchAccountService } from '@features/account/services/fetch-account/fetch-account.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'orb-update-account-form',
	imports: [ReactiveFormsModule, ButtonModule, EmailInput, PasswordInput],
	templateUrl: './update-account-form.html',
})
export class AccountForm implements OnInit {
	protected readonly fetchAccountService = inject(FetchAccountService);
	protected readonly formService = inject(UpdateAccountFormService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected isFetching = signal(false);
	protected isFetchingError = signal(false);

	protected email = computed(() => this.formService.form.get('email') as FormControl<string>);
	protected password = computed(() => this.formService.form.get('password') as FormControl<string>);

	ngOnInit(): void {
		this.fetchAccount();
	}

	protected fetchAccount() {
		if (this.isFetching()) return;

		this.isFetching.set(true);

		this.fetchAccountService
			.fetchAccount()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isFetching.set(false)),
			)
			.subscribe({
				next: (user) => {
					this.formService.form.get('email')?.setValue(user.email);
					this.formService.form.get('password')?.setValue(user.password);

					this.isFetchingError.set(false);
				},
				error: (err) => {
					this.isFetchingError.set(true);

					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Fetch Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}

	protected updateAccount() {
		this.formService
			.updateAccount()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Update Success',
						detail: 'Successfully updated your account!',
					});
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Update Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
