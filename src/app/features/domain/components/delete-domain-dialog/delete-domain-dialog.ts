import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { DeleteDomainService } from '@features/domain/services/delete-domain/delete-domain.service';

@Component({
	selector: 'orb-delete-domain-dialog',
	imports: [ButtonModule],
	templateUrl: './delete-domain-dialog.html',
})
export class DeleteDomainDialog {
	private readonly deleteDomainService = inject(DeleteDomainService);
	private readonly messageService = inject(MessageService);
	private readonly dynamicDialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	readonly domain = input.required<Domain>();

	protected readonly isDeleting = signal(false);
	protected readonly isDeleted = signal(false);

	protected deleteDomain() {
		const domainId = this.domain().id;

		if (domainId == null || this.isDeleting() || this.isDeleted()) return;

		this.isDeleting.set(true);

		this.deleteDomainService
			.deleteDomainById(domainId)
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
						summary: 'Delete Success',
						detail: 'Successfully deleted the domain',
					});

					this.dynamicDialogRef.close(true);
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Delete Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
