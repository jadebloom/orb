import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateDomainForm } from '@features/domain/components/create-domain-form/create-domain-form';
import { DeleteAllDomainsDialog } from '@features/domain/components/delete-all-domains-dialog/delete-all-domains-dialog';

@Component({
	selector: 'orb-domains-page',
	imports: [ButtonModule],
	templateUrl: './domains-page.html',
	host: {
		class: 'flex-1 px-3',
	},
	providers: [DialogService],
})
export class DomainsPage {
	private readonly dialogService = inject(DialogService);

	private ref1?: DynamicDialogRef<CreateDomainForm> | null;
	private ref2?: DynamicDialogRef<DeleteAllDomainsDialog> | null;

	protected createDomain() {
		this.ref1 = this.dialogService.open(CreateDomainForm, {
			header: 'Create new domain',
			width: '50vw',
			modal: true,
			closable: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});
	}

	protected deleteAllDomains() {
		this.ref2 = this.dialogService.open(DeleteAllDomainsDialog, {
			header: 'Delete your all domains',
			width: '50vw',
			modal: true,
			closable: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});
	}
}
