import { Component, DestroyRef, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomainGoal } from '@core/database/models/domain-goal';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { CreateDomainGoalFormService } from '@features/domain/services/create-domain-goal-form/create-domain-goal-form.service';

@Component({
	selector: 'orb-create-domain-goal-form',
	imports: [ReactiveFormsModule, ButtonModule],
	templateUrl: './create-domain-goal-form.html',
})
export class CreateDomainGoalForm {
	protected readonly formService = inject(CreateDomainGoalFormService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly created = output<DomainGoal>();

	protected createDomainGoal() {
		this.formService
			.createDomainGoal()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (createdDomainGoal) => {
					this.created.emit(createdDomainGoal);

					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Creation Success',
						detail: 'Successfully created your new domain goal!',
					});
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Creation Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
