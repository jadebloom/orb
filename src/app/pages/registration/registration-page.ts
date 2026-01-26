import { Component } from '@angular/core';
import { RegistrationForm } from '@core/security/components/registration-form/registration-form';

@Component({
	selector: 'orb-registration-page',
	imports: [RegistrationForm],
	templateUrl: './registration-page.html',
	host: {
		class: 'flex justify-center flex-1 items-center px-3',
	},
})
export class RegistrationPage {}
