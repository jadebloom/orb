import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { FetchAllDomainsService } from '@features/domain/services/fetch-all-domains/fetch-all-domains.service';
import { DomainBusService } from '@features/domain/services/domain-bus/domain-bus.service';
import { DeleteAllDomainsDialog } from '@features/domain/components/delete-all-domains-dialog/delete-all-domains-dialog';
import { CreateDomainForm } from '@features/domain/components/create-domain-form/create-domain-form';
import { DomainPreview } from '@features/domain/components/domain-preview/domain-preview';

@Component({
	selector: 'orb-domains-page',
	imports: [ButtonModule, DomainPreview],
	templateUrl: './domains-page.html',
	host: {
		class: 'flex-1 px-3',
	},
	providers: [DialogService],
})
export class DomainsPage implements OnInit {
	private readonly fetchAllDomainsService = inject(FetchAllDomainsService);
	private readonly domainBusService = inject(DomainBusService);
	private readonly dialogService = inject(DialogService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly domains = signal<Domain[]>([]);
	protected readonly areFetchingAllDomains = signal(false);

	private ref1?: DynamicDialogRef<CreateDomainForm> | null;
	private ref2?: DynamicDialogRef<DeleteAllDomainsDialog> | null;

	ngOnInit(): void {
		this.fetchAllDomains();

		this.domainBusService.fetchAllDomains$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
			next: () => {
				this.fetchAllDomains();
			},
		});
	}

	protected fetchAllDomains() {
		this.fetchAllDomainsService
			.fetchAllDomains()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.areFetchingAllDomains.set(false)),
			)
			.subscribe({
				next: (domains) => {
					this.domains.set(domains);
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Fetch Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}

	protected createDomain() {
		this.ref1 = this.dialogService.open(CreateDomainForm, {
			header: 'Create new domain',
			width: '50vw',
			modal: true,
			closable: true,
			closeOnEscape: true,
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
			closeOnEscape: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});
	}
}
