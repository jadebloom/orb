import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AuthenticationFormService } from '@core/auth/services/authentication-form/authentication-form.service';
import { Router } from '@angular/router';

@Component({
	selector: 'orb-authentication-form',
	imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, ButtonModule, MessageModule],
	templateUrl: './authentication-form.html',
	providers: [AuthenticationFormService],
	host: {
		class: 'w-full',
	},
})
export class AuthenticationForm {
	protected readonly formService = inject(AuthenticationFormService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected authenticate() {
		this.formService
			.authenticate()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Authentication Success',
						detail: 'Successfully authenticated!',
					});

					this.router.navigate(['/']);
				},
				error: () => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Authentication Failure',
						detail: 'Failed to authenticated',
					});
				},
			});
	}
}
