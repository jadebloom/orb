import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { CreateDomainFormService } from '@features/domain/services/create-domain-form/create-domain-form.service';
import { DomainNameInput } from '@features/domain/components/domain-name-input/domain-name-input';
import { DomainColorPicker } from '@features/domain/components/domain-color-picker/domain-color-picker';

@Component({
	selector: 'orb-create-domain-form',
	imports: [ReactiveFormsModule, ButtonModule, DomainNameInput, DomainColorPicker],
	templateUrl: './create-domain-form.html',
})
export class CreateDomainForm {
	protected readonly formService = inject(CreateDomainFormService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	protected readonly name = computed(
		() => this.formService.form.get('name') as FormControl<string>,
	);

	protected readonly color = computed(
		() => this.formService.form.get('color') as FormControl<string>,
	);

	protected createDomain() {
		this.formService
			.createDomain()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Creation Success',
						detail: 'Successfully created your new domain!',
					});

					this.formService.form.reset();
				},
				error: (err) => {
					this.messageService.add({
						key: 'main',
						severity: 'error',
						summary: 'Creation Failure',
						detail: err?.message ?? DEFAULT_ERROR_MESSAGE,
					});
				},
			});
	}
}
