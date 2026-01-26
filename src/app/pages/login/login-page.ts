import { Component } from '@angular/core';
import { LoginForm } from '@core/security/components/login-form/login-form';

@Component({
	selector: 'app-login-page',
	imports: [LoginForm],
	templateUrl: './login-page.html',
	host: {
		class: 'flex justify-center flex-1 items-center px-3',
	},
})
export class LoginPage {}
