import { Component, computed, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { Domain } from '@core/database/models/domain';
import { UpdateDomainFormService } from '@features/domain/services/update-domain-form/update-domain-form.service';
import { DomainNameInput } from '@features/domain/components/domain-name-input/domain-name-input';
import { DomainColorPicker } from '@features/domain/components/domain-color-picker/domain-color-picker';

@Component({
	selector: 'orb-update-domain-form',
	imports: [ReactiveFormsModule, ButtonModule, DomainNameInput, DomainColorPicker],
	templateUrl: './update-domain-form.html',
})
export class UpdateDomainForm implements OnInit {
	protected readonly formService = inject(UpdateDomainFormService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	initialDomain = input.required<Domain>();
	updated = output<Domain>();

	name = computed(() => this.formService.form.get('name') as FormControl<string>);

	color = computed(() => this.formService.form.get('color') as FormControl<string>);

	ngOnInit(): void {
		this.formService.loadInitialDomain(this.initialDomain());
	}

	protected updateDomain() {
		const domainId = this.initialDomain().id;

		if (Number.isNaN(domainId) || typeof domainId !== 'number') return;

		this.formService
			.updateDomain(domainId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (domain) => {
					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Update Success',
						detail: 'Successfully update the domain!',
					});

					this.updated.emit(domain);
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Update Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
