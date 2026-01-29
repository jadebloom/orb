import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, Observable } from 'rxjs';
import { Domain } from '@core/database/models/domain';
import { UpdateDomain } from '@features/domain/services/update-domain/update-domain';
import { hexColorCodeValidator } from '@features/domain/validators/hex-color.validator';

@Injectable({ providedIn: 'root' })
export class UpdateDomainFormService {
	private readonly updateDomainService = inject(UpdateDomain);

	readonly form = new FormGroup({
		name: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(32)],
		}),
		color: new FormControl('#FF0000', {
			nonNullable: true,
			validators: [Validators.required, hexColorCodeValidator()],
		}),
	});

	readonly isUpdating = signal(false);

	updateDomain(domainId: number): Observable<Domain> {
		if (this.form.invalid) {
			this.form.markAsTouched();

			return EMPTY;
		}

		if (this.isUpdating()) return EMPTY;

		this.isUpdating.set(true);
		this.form.disable();

		const body = this.form.getRawValue();

		return this.updateDomainService
			.updateDomain(domainId, { name: body.name, color: body.color })
			.pipe(
				finalize(() => {
					this.isUpdating.set(false);
					this.form.enable();
				}),
			);
	}

	loadInitialDomain(domain: Domain) {
		this.form.get('name')?.setValue(domain.name);
		this.form.get('color')?.setValue(domain.color);
	}
}
