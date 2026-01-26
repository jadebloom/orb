import { Component } from '@angular/core';
import { AuthenticationForm } from '@core/auth/components/authentication-form/authentication-form';

@Component({
	selector: 'orb-authentication-page',
	imports: [AuthenticationForm],
	templateUrl: './authentication-page.html',
	host: {
		class: 'flex justify-center flex-1 items-center px-3',
	},
})
export class AuthenticationPage {}
