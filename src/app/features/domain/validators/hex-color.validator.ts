import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function hexColorCodeValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const v: string = control.value;

		if (!v) {
			return null; // don't validate empty values (use Validators.required if needed)
		}

		const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

		const isValid = hexColorRegex.test(v);

		return isValid ? null : { hexColorCode: { value: v } };
	};
}
