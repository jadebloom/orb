import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Domain } from '@core/database/models/domain';
import { DomainGoal } from '@core/database/models/domain-goal';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { FetchAllDomainGoalsService } from '@features/domain/services/fetch-all-domain-goals/fetch-all-domain-goals.service';
import { DeleteAllDomainGoalsDialog } from '@features/domain/components/delete-all-domain-goals-dialog/delete-all-domain-goals-dialog';
import { CreateDomainGoalDialog } from '@features/domain/components/create-domain-goal-dialog/create-domain-goal-dialog';
import { DomainGoalsTable } from '@features/domain/components/domain-goals-table/domain-goals-table';

@Component({
	selector: 'orb-domain-goals-manager',
	imports: [ButtonModule, DomainGoalsTable],
	templateUrl: './domain-goals-manager.html',
	providers: [DialogService],
})
export class DomainGoalsManager implements OnInit {
	protected readonly router = inject(Router);
	private readonly fetchAllDomainGoalsService = inject(FetchAllDomainGoalsService);
	private readonly dialogService = inject(DialogService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly domain = input.required<Domain>();

	ref1?: DynamicDialogRef | null;
	ref2?: DynamicDialogRef | null;

	protected readonly domainGoals = signal<DomainGoal[]>([]);
	protected readonly isFetchingDomainGoals = signal(false);

	ngOnInit(): void {
		this.fetchAllDomainGoals();
	}

	protected fetchAllDomainGoals() {
		const domainId = this.domain()?.id;

		if (domainId == null || this.isFetchingDomainGoals()) return;

		this.isFetchingDomainGoals.set(true);

		this.fetchAllDomainGoalsService
			.fetchAllGoalsByDomainId(domainId)
			.pipe(
				takeUntilDestroyed(this.destroyRef),
				finalize(() => this.isFetchingDomainGoals.set(false)),
			)
			.subscribe({
				next: (domainGoals) => this.domainGoals.set(domainGoals),
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Domain Goals Fetch Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}

	protected createDomainGoal() {
		this.ref1 = this.dialogService.open(CreateDomainGoalDialog, {
			header: 'Create domain goal',
			width: '50vw',
			modal: true,
			closable: true,
			closeOnEscape: true,
			breakpoints: {
				'960px': '75vw',
				'640px': '90vw',
			},
		});

		this.ref1?.onClose.subscribe(() => this.fetchAllDomainGoals());
	}

	protected deleteAllDomainGoals() {
		this.ref2 = this.dialogService.open(DeleteAllDomainGoalsDialog, {
			header: 'Delete all domain goals',
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

		this.ref2?.onClose.subscribe((areDeleted) => {
			if (typeof areDeleted === 'boolean' && areDeleted) {
				this.fetchAllDomainGoals();
			}
		});
	}
}
