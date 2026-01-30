import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
	selector: 'orb-domain-goal-type-toggle-switch',
	imports: [ReactiveFormsModule, ToggleSwitchModule],
	templateUrl: './domain-goal-type-toggle-switch.html',
})
export class DomainGoalTypeToggleSwitch {
	readonly fc = input.required<FormControl<boolean>>();
}
