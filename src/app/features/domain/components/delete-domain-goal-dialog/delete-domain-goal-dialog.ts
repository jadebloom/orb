import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomainGoal } from '@core/database/models/domain-goal';
import { DeleteDomainGoalService } from '@features/domain/services/delete-domain-goal/delete-domain-goal.service';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';

@Component({
	selector: 'orb-delete-domain-goal-dialog',
	imports: [ButtonModule],
	templateUrl: './delete-domain-goal-dialog.html',
})
export class DeleteDomainGoalDialog {
	private readonly deleteDomainGoalService = inject(DeleteDomainGoalService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly domainGoal = input.required<DomainGoal>();

	protected readonly isDeleting = signal(false);
	protected readonly isDeleted = signal(false);

	protected deleteDomainGoal() {
		const domainGoalId = this.domainGoal().id;

		if (this.isDeleting() || this.isDeleted() || domainGoalId == null) return;

		this.isDeleting.set(true);

		this.deleteDomainGoalService
			.deleteDomainGoalByDomainId(domainGoalId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.isDeleted.set(true);

					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Deletion Success',
						detail: 'Successfully deleted the goal!',
					});

					this.dynamicDialogRef.close();
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Deletion Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
