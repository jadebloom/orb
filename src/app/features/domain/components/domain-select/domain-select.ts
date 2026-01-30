import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { FetchAllDomainsService } from '@features/domain/services/fetch-all-domains/fetch-all-domains.service';
import { RequiredStar } from '@toolkit/components/required-star/required-star';

@Component({
	selector: 'orb-domain-select',
	imports: [ReactiveFormsModule, SelectModule, ButtonModule, MessageModule, RequiredStar],
	templateUrl: './domain-select.html',
})
export class DomainSelect implements OnInit {
	private readonly fetchAllDomainsService = inject(FetchAllDomainsService);
	private messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly fc = input.required<FormControl<number | null>>();

	protected readonly domains = signal<Domain[]>([]);
	protected readonly isFetchingAllDomains = signal(false);

	ngOnInit(): void {
		this.fetchAllDomains();
	}

	protected fetchAllDomains() {
		if (this.isFetchingAllDomains()) return;

		this.isFetchingAllDomains.set(true);

		this.fetchAllDomainsService
			.fetchAllDomains()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isFetchingAllDomains.set(false)),
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
}
