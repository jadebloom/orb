import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'orb-email-input',
	imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, MessageModule],
	templateUrl: './email-input.html',
})
export class EmailInput {
	readonly fc = input.required<FormControl<string>>();
}
