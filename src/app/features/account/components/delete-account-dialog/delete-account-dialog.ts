import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { UserService } from '@core/database/services/user/user.service';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { DeleteAccountService } from '@features/account/services/delete-account/delete-account.service';

@Component({
	selector: 'orb-delete-account-dialog',
	imports: [ButtonModule],
	templateUrl: './delete-account-dialog.html',
})
export class DeleteAccountDialog {
	private readonly deleteAccountService = inject(DeleteAccountService);
	private readonly authenticationService = inject(AuthenticationService);
	private readonly userService = inject(UserService);
	private readonly router = inject(Router);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly isDeleting = signal(false);
	protected readonly isDeleted = signal(false);

	protected deleteAccount() {
		if (this.isDeleting() || this.isDeleted()) return;

		this.isDeleting.set(true);

		this.deleteAccountService
			.deleteAccount()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.isDeleted.set(true);

					this.authenticationService.logout();
					this.userService.doesUserExist.set(false);

					this.router.navigate(['/registration']);

					this.dynamicDialogRef.close(true);
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Delete Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
