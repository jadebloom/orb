import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { DeleteAllDomainGoalsService } from '@features/domain/services/delete-all-domain-goals/delete-all-domain-goals.service';

@Component({
	selector: 'orb-delete-all-domain-goals-dialog',
	imports: [ButtonModule],
	templateUrl: './delete-all-domain-goals-dialog.html',
})
export class DeleteAllDomainGoalsDialog {
	private readonly deleteAllDomainGoalsService = inject(DeleteAllDomainGoalsService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly domain = input.required<Domain>();

	protected readonly isDeleting = signal(false);

	protected deleteAllDomainGoals() {
		const domainId = this.domain()?.id;

		if (domainId == null || this.isDeleting()) return;

		this.isDeleting.set(true);

		this.deleteAllDomainGoalsService
			.deleteAllDomainGoalsByDomainId(domainId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Deletion Success',
						detail: "Successfully deleted the domain's all goals!",
					});

					this.dynamicDialogRef.close(true);
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
