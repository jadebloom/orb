import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, map, Observable } from 'rxjs';
import { CreateDomainService } from '@features/domain/services/create-domain/create-domain.service';
import { hexColorCodeValidator } from '@features/domain/validators/hex-color.validator';
import { Domain } from '@core/database/models/domain';

@Injectable({ providedIn: 'root' })
export class CreateDomainFormService {
	private readonly createDomainService = inject(CreateDomainService);

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

	readonly isCreating = signal(false);

	createDomain(): Observable<Domain> {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return EMPTY;
		}

		if (this.isCreating()) return EMPTY;

		this.isCreating.set(true);
		this.form.disable();

		const body = this.form.getRawValue();

		return this.createDomainService
			.createDomain({
				name: body.name,
				color: body.color,
			})
			.pipe(
				map((domain) => {
					this.form.reset();

					return domain;
				}),
				finalize(() => {
					this.isCreating.set(false);
					this.form.enable();
				}),
			);
	}
}
