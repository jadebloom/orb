import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StyleClass } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '@core/database/services/user/user.service';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { DeleteAccountService } from '@features/account/services/delete-account/delete-account.service';

interface Section {
	sectionName: string;
	items: {
		label: string;
		icon: string;
		class?: string;
		action: (e: Event) => unknown;
	}[];
}

@Component({
	selector: 'orb-menu',
	imports: [ButtonModule, StyleClass, DividerModule, ConfirmDialogModule],
	templateUrl: './menu.html',
	providers: [ConfirmationService],
})
export class Menu {
	private readonly deleteAccountService = inject(DeleteAccountService);
	private readonly confirmationService = inject(ConfirmationService);
	private readonly router = inject(Router);
	private readonly authenticationService = inject(AuthenticationService);
	private readonly userService = inject(UserService);
	private readonly messageService = inject(MessageService);

	protected readonly sections: Section[] = [
		{
			sectionName: 'Account',
			items: [
				{
					label: 'Your account',
					icon: 'pi pi-user',
					action: () => this.router.navigate(['/account']),
				},
				{
					label: 'Delete account',
					icon: 'pi pi-trash',
					class: 'hover:text-red-400',
					action: (e: Event) => this.deleteAccount(e),
				},
			],
		},
		{
			sectionName: 'Source',
			items: [
				{
					label: 'View documentation',
					icon: 'pi pi-github',
					action: () =>
						window.open('https://github.com/the-jade-chamber/orb', '_blank', 'noopener,noreferrer'),
				},
				{
					label: 'See author',
					icon: 'pi pi-github',
					action: () =>
						window.open('https://github.com/jadebloom', '_blank', 'noopener,noreferrer'),
				},
			],
		},
	];

	protected deleteAccount(event: Event) {
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Do you want to delete your account?',
			header: 'Danger Zone',
			icon: 'pi pi-info-circle',
			rejectLabel: 'Cancel',
			rejectButtonProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptButtonProps: {
				label: 'Delete',
				severity: 'danger',
			},
			accept: () => {
				this.deleteAccountService.deleteAccount().subscribe({
					next: () => {
						this.authenticationService.logout();
						this.userService.doesUserExist.set(false);

						this.router.navigate(['/registration']);
					},
					error: (err) => {
						this.messageService.add({
							key: 'main',
							severity: 'error',
							summary: 'Deletion Failure',
							detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
						});
					},
				});
			},
		});
	}
}
