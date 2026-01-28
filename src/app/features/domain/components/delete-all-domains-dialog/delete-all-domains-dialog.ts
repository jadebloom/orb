import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { DeleteAllDomainsService } from '@features/domain/services/delete-all-domains/delete-all-domains.service';
import { DomainBusService } from '@features/domain/services/domain-bus/domain-bus.service';

@Component({
	selector: 'orb-delete-all-domains-dialog',
	imports: [ButtonModule],
	templateUrl: './delete-all-domains-dialog.html',
})
export class DeleteAllDomainsDialog {
	protected readonly deleteAllDomainsService = inject(DeleteAllDomainsService);
	private readonly domainBusService = inject(DomainBusService);
	private readonly messageService = inject(MessageService);
	private readonly dialogRef = inject(DynamicDialogRef);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly isDeleting = signal(false);

	protected deleteAllDomains() {
		if (this.isDeleting()) return;

		this.isDeleting.set(true);

		this.deleteAllDomainsService
			.deleteAllDomains()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.domainBusService.triggerFetchAllDomains();

					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Deletion Success',
						detail: 'Successfully deleted your all domains!',
					});

					this.dialogRef.close(true);
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
