import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, finalize, Observable } from 'rxjs';
import { DomainGoal } from '@core/database/models/domain-goal';
import { UpdateDomainGoalService } from '@features/domain/services/update-domain-goal/update-domain-goal.service';

@Injectable({ providedIn: 'root' })
export class UpdateDomainGoalFormService {
	private readonly updateDomainGoalService = inject(UpdateDomainGoalService);

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

	readonly isUpdating = signal(false);

	updateDomainGoal(domainGoalId: number): Observable<DomainGoal> {
		const body = this.form.getRawValue();

		if (this.form.invalid || body.domainId == null) {
			this.form.markAllAsTouched();

			return EMPTY;
		}

		if (this.isUpdating()) return EMPTY;

		this.isUpdating.set(true);
		this.form.disable();

		return this.updateDomainGoalService
			.updateDomainGoal(domainGoalId, {
				name: body.name,
				targetValue: body.targetValue,
				isGoalBoolean: body.isGoalBoolean,
				domainId: body.domainId,
			})
			.pipe(
				finalize(() => {
					this.isUpdating.set(false);
					this.form.enable();
				}),
			);
	}
}
