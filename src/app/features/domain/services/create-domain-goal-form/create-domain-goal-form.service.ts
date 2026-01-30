import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, Observable } from 'rxjs';
import { DomainGoal } from '@core/database/models/domain-goal';
import { CreateDomainGoalService } from '@features/domain/services/create-domain-goal/create-domain-goal.service';

@Injectable({ providedIn: 'root' })
export class CreateDomainGoalFormService {
	private readonly createDomainGoalService = inject(CreateDomainGoalService);

	readonly form = new FormGroup({
		name: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(64)],
		}),
		isGoalBoolean: new FormControl(true, {
			nonNullable: true,
			validators: [Validators.required],
		}),
		targetValue: new FormControl(0, { nonNullable: true }),
		domainId: new FormControl<number | null>(null, {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	readonly isCreating = signal(false);

	createDomainGoal(): Observable<DomainGoal> {
		const body = this.form.getRawValue();

		if (this.form.invalid || body.domainId == null) {
			this.form.markAllAsTouched();

			return EMPTY;
		}

		if (this.isCreating()) return EMPTY;

		this.isCreating.set(true);
		this.form.disable();

		return this.createDomainGoalService
			.createDomainGoal({
				name: body.name,
				targetValue: body.targetValue,
				isGoalBoolean: body.isGoalBoolean,
				domainId: body.domainId,
			})
			.pipe(
				finalize(() => {
					this.isCreating.set(false);
					this.form.disable();
				}),
			);
	}
}
