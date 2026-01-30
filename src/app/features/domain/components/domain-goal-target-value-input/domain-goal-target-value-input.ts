import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'orb-domain-goal-target-value-input',
	imports: [ReactiveFormsModule, FloatLabelModule, InputNumberModule, MessageModule, RequiredStar],
	templateUrl: './domain-goal-target-value-input.html',
})
export class DomainGoalTargetValueInput {
	readonly fc = input.required<FormControl<number>>();
}
