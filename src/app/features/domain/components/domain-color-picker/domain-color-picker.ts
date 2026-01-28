import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { BooleanStateService } from '@services/boolean-state/boolean-state.service';

@Component({
	selector: 'orb-domain-color-picker',
	imports: [ReactiveFormsModule, ColorPickerModule],
	templateUrl: './domain-color-picker.html',
})
export class DomainColorPicker {
	protected readonly booleanStateService = inject(BooleanStateService);

	readonly fc = input.required<FormControl<string>>();
}
