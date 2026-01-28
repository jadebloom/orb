import { Component, inject, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Domain } from '@core/database/models/domain';
import { DeleteDomainDialog } from '@features/domain/components/delete-domain-dialog/delete-domain-dialog';

@Component({
	selector: 'orb-domain-preview',
	imports: [ButtonModule],
	templateUrl: './domain-preview.html',
	providers: [DialogService],
})
export class DomainPreview {
	private readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);

	domain = input.required<Domain>();
	deleted = output<void>();

	ref?: DynamicDialogRef<DeleteDomainDialog> | null;

	protected readonly isDeleting = signal(false);
	protected readonly isDeleted = signal(false);

	protected viewDomain(event: Event) {
		event.stopImmediatePropagation();
		event.preventDefault();

		this.router.navigate(['/domains', this.domain().id]);
	}

	protected deleteDomain(event: Event) {
		event.stopImmediatePropagation();
		event.preventDefault();

		this.ref = this.dialogService.open(DeleteDomainDialog, {
			header: 'Delete your domain',
			inputValues: { domain: this.domain() },
			width: '50vw',
			modal: true,
			closable: true,
			closeOnEscape: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});

		this.ref?.onClose.subscribe((isDeleted: unknown) => {
			if (typeof isDeleted === 'boolean' && isDeleted) {
				this.deleted.emit();
			}
		});
	}
}
