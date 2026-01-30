import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'orb-domain-name-input',
	imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, MessageModule, RequiredStar],
	templateUrl: './domain-name-input.html',
})
export class DomainNameInput {
	readonly fc = input.required<FormControl<string>>();
}
