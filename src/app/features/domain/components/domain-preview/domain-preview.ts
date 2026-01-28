import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { DeleteDomainService } from '@features/domain/services/delete-domain/delete-domain.service';
import { DomainBusService } from '@features/domain/services/domain-bus/domain-bus.service';

@Component({
	selector: 'orb-domain-preview',
	imports: [ButtonModule],
	templateUrl: './domain-preview.html',
})
export class DomainPreview {
	private readonly domainBusService = inject(DomainBusService);
	private readonly deleteDomainService = inject(DeleteDomainService);
	private readonly router = inject(Router);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	domain = input.required<Domain>();
	deleted = output<void>();

	protected readonly isDeleting = signal(false);
	protected readonly isDeleted = signal(false);

	protected viewDomain(event: Event) {
		event.stopImmediatePropagation();
		event.preventDefault();

		this.router.navigate(['/domains', `${this.domain().id}`]);
	}

	protected deleteDomain(event: Event) {
		event.stopImmediatePropagation();
		event.preventDefault();

		if (this.isDeleting() || this.isDeleted()) return;

		const domainId = this.domain().id;

		if (typeof domainId !== 'number' || Number.isNaN(domainId)) return;

		this.isDeleting.set(true);

		this.deleteDomainService
			.deleteDomainById(domainId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isDeleting.set(false)),
			)
			.subscribe({
				next: () => {
					this.domainBusService.triggerFetchAllDomains();

					this.isDeleted.set(true);

					this.deleted.emit();
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Deleting Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
