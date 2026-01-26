import { Component, computed, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { PasswordInput } from '@core/security/components/password-input/password-input';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { LoginFormService } from '@core/security/services/login-form/login-form.service';

@Component({
	selector: 'orb-login-form',
	imports: [ReactiveFormsModule, ButtonModule, PasswordInput],
	templateUrl: './login-form.html',
	providers: [LoginFormService],
})
export class LoginForm {
	protected readonly formService = inject(LoginFormService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected password = computed(() => this.formService.form.get('password') as FormControl<string>);

	protected login() {
		this.formService
			.login()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => this.router.navigate(['/']),
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Unlock Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
