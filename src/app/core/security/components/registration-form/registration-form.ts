import { Component, computed, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RegistrationFormService } from '@core/security/services/registration-form/registration-form.service';
import { EmailInput } from '@core/security/components/email-input/email-input';
import { PasswordInput } from '@core/security/components/password-input/password-input';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';

@Component({
	selector: 'orb-registration-form',
	imports: [ReactiveFormsModule, ButtonModule, EmailInput, PasswordInput],
	templateUrl: './registration-form.html',
	providers: [RegistrationFormService],
})
export class RegistrationForm {
	protected readonly formService = inject(RegistrationFormService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected email = computed(() => this.formService.form.get('email') as FormControl<string>);

	protected password = computed(() => this.formService.form.get('password') as FormControl<string>);

	protected register() {
		this.formService
			.register()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => this.router.navigate(['/']),
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Creation Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
