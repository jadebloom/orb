import { Component, inject } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomainGoal } from '@core/database/models/domain-goal';
import { CreateDomainGoalForm } from '@features/domain/components/create-domain-goal-form/create-domain-goal-form';

@Component({
	selector: 'orb-create-domain-goal-dialog',
	imports: [CreateDomainGoalForm],
	templateUrl: './create-domain-goal-dialog.html',
})
export class CreateDomainGoalDialog {
	private readonly dynamicDialogRef = inject(DynamicDialogRef);

	protected onCreate(createdDomainGoal: DomainGoal) {
		this.dynamicDialogRef.close(createdDomainGoal);
	}
}
