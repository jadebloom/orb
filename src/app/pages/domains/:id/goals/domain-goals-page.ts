import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Domain } from '@core/database/models/domain';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { FetchDomainService } from '@features/domain/services/fetch-domain/fetch-domain.service';

@Component({
	selector: 'orb-domain-goals',
	imports: [ButtonModule],
	templateUrl: './domain-goals-page.html',
	host: {
		class: 'flex-1 px-3',
	},
})
export class DomainGoalsPage implements OnInit {
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly fetchDomainService = inject(FetchDomainService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

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
						summary: 'Domain Fetch Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
