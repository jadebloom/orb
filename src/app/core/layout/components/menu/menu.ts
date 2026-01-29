import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteAccountDialog } from '@features/account/components/delete-account-dialog/delete-account-dialog';

@Component({
	selector: 'orb-menu',
	imports: [ButtonModule, MenuModule],
	templateUrl: './menu.html',
	providers: [DialogService],
})
export class Menu {
	private readonly dialogService = inject(DialogService);

	private ref?: DynamicDialogRef<DeleteAccountDialog> | null;

	protected readonly items: MenuItem[] = [
		{
			label: 'Domains',
			items: [
				{
					label: 'Your domains',
					icon: 'pi pi-box',
					routerLink: '/domains',
				},
			],
		},
		{
			label: 'Account',
			items: [
				{
					label: 'Your account',
					icon: 'pi pi-user',
					routerLink: '/account',
				},
				{
					label: 'Delete account',
					icon: 'pi pi-trash',
					class: 'hover:text-red-400',
					command: () => this.deleteAccount(),
				},
			],
		},
		{
			label: 'Source',
			items: [
				{
					label: 'Documentation',
					icon: 'pi pi-github',
					url: 'https://github.com/jadebloom/orb',
				},
				{
					label: 'See author',
					icon: 'pi pi-github',
					url: 'https://github.com/jadebloom',
				},
			],
		},
	];

	protected deleteAccount() {
		this.dialogService.open(DeleteAccountDialog, {
			header: 'Delete your account',
			width: '50vw',
			modal: true,
			closable: true,
			closeOnEscape: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});
	}
}
