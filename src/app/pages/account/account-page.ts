import { Component } from '@angular/core';
import { AccountForm } from '@features/account/components/update-account-form/update-account-form';

@Component({
	selector: 'orb-account-page',
	imports: [AccountForm],
	templateUrl: './account-page.html',
	host: {
		class: 'flex-1 px-3',
	},
})
export class AccountPage {}
