import { Component, inject, input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomainGoal } from '@core/database/models/domain-goal';
import { UpdateDomainGoalForm } from '@features/domain/components/update-domain-goal-form/update-domain-goal-form';

@Component({
	selector: 'orb-update-domain-goal-dialog',
	imports: [UpdateDomainGoalForm],
	templateUrl: './update-domain-goal-dialog.html',
})
export class UpdateDomainGoalDialog {
	private readonly dynamicDialogRef = inject(DynamicDialogRef);

	readonly initialDomainGoal = input.required<DomainGoal>();

	protected onUpdate(updatedDomainGoal: DomainGoal) {
		this.dynamicDialogRef.close(updatedDomainGoal);
	}
}
