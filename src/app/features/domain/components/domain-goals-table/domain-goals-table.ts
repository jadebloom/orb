import { Component, inject, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomainGoal } from '@core/database/models/domain-goal';
import { UpdateDomainGoalDialog } from '@features/domain/components/update-domain-goal-dialog/update-domain-goal-dialog';
import { DeleteDomainGoalDialog } from '@features/domain/components/delete-domain-goal-dialog/delete-domain-goal-dialog';

@Component({
	selector: 'orb-domain-goals-table',
	imports: [TableModule, SkeletonModule, ButtonModule],
	templateUrl: './domain-goals-table.html',
	providers: [DialogService],
})
export class DomainGoalsTable {
	private readonly dialogService = inject(DialogService);

	readonly domainGoals = input.required<DomainGoal[]>();
	readonly loading = input.required<boolean>();

	readonly updated = output<DomainGoal>();
	readonly deleted = output<void>();

	ref1?: DynamicDialogRef<UpdateDomainGoalDialog> | null;
	ref2?: DynamicDialogRef<DeleteDomainGoalDialog> | null;

	protected openUpdateDomainGoalDialog(domainGoal: DomainGoal) {
		this.ref1 = this.dialogService.open(UpdateDomainGoalDialog, {
			header: 'Update domain goal',
			inputValues: { initialDomainGoal: domainGoal },
			width: '50vw',
			modal: true,
			closable: true,
			closeOnEscape: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});

		this.ref1?.onClose.subscribe((updatedDomainGoal: DomainGoal) =>
			this.updated.emit(updatedDomainGoal),
		);
	}

	protected openDeleteDomainGoalDialog(domainGoal: DomainGoal) {
		this.ref2 = this.dialogService.open(DeleteDomainGoalDialog, {
			header: 'Delete domain goal',
			inputValues: { domainGoal },
			width: '50vw',
			modal: true,
			closable: true,
			closeOnEscape: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});

		this.ref2?.onClose.subscribe(() => this.deleted.emit());
	}
}
