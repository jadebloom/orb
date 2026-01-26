import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'orb-password-input',
	imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, MessageModule],
	templateUrl: './password-input.html',
})
export class PasswordInput {
	readonly fc = input.required<FormControl<string>>();
}
