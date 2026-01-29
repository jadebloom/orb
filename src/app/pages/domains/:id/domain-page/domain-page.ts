import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { FetchDomainService } from '@features/domain/services/fetch-domain/fetch-domain.service';
import { DeleteDomainDialog } from '@features/domain/components/delete-domain-dialog/delete-domain-dialog';
import { UpdateDomainDialog } from '@features/domain/components/update-domain-dialog/update-domain-dialog';

@Component({
	selector: 'orb-domain-page',
	imports: [ButtonModule],
	templateUrl: './domain-page.html',
	host: {
		class: 'flex-1 px-3',
	},
	providers: [DialogService],
})
export class DomainPage implements OnInit {
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly fetchDomainService = inject(FetchDomainService);
	private readonly messageService = inject(MessageService);
	private readonly router = inject(Router);
	private readonly dialogService = inject(DialogService);
	private readonly destroyRef = inject(DestroyRef);

	ref1?: DynamicDialogRef | null;
	ref2?: DynamicDialogRef | null;

	protected readonly domainId = signal<number | null>(null);
	protected readonly domain = signal<Domain | null>(null);
	protected readonly isFetchingDomain = signal(false);

	ngOnInit(): void {
		this.activatedRoute.params.subscribe({
			next: (page) => {
				const id = Number(page['id']);

				if (Number.isNaN(id) || typeof id != 'number') return;

				this.domainId.set(id);
				this.fetchDomainById();
			},
		});
	}

	protected fetchDomainById() {
		const domainId = this.domainId();

		if (domainId == null || this.isFetchingDomain()) return;

		this.isFetchingDomain.set(true);

		this.fetchDomainService
			.fetchDomainById(domainId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isFetchingDomain.set(false)),
			)
			.subscribe({
				next: (domain) => this.domain.set(domain),
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

	protected updateDomain() {
		this.ref1 = this.dialogService.open(UpdateDomainDialog, {
			header: 'Update your domain',
			inputValues: { domain: this.domain() },
			width: '50vw',
			modal: true,
			closable: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});

		this.ref1?.onClose.subscribe((isUpdated) => {
			if (typeof isUpdated === 'boolean' && isUpdated) {
				this.fetchDomainById();
			}
		});
	}

	protected deleteDomain() {
		this.ref2 = this.dialogService.open(DeleteDomainDialog, {
			header: 'Delete your domain',
			inputValues: { domain: this.domain() },
			width: '50vw',
			modal: true,
			closable: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});

		this.ref2?.onClose.subscribe((isDeleted: unknown) => {
			if (typeof isDeleted === 'boolean' && isDeleted) {
				this.router.navigate(['/domains']);
			}
		});
	}
}
