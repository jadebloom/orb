import { Component, computed, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomainGoal } from '@core/database/models/domain-goal';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { CreateDomainGoalFormService } from '@features/domain/services/create-domain-goal-form/create-domain-goal-form.service';
import { DomainGoalNameInput } from '@features/domain/components/domain-goal-name-input/domain-goal-name-input';
import { DomainGoalTargetValueInput } from '@features/domain/components/domain-goal-target-value-input/domain-goal-target-value-input';
import { DomainGoalTypeToggleSwitch } from '../domain-goal-type-toggle-switch/domain-goal-type-toggle-switch';
import { DomainSelect } from '../domain-select/domain-select';

@Component({
	selector: 'orb-create-domain-goal-form',
	imports: [
		ReactiveFormsModule,
		ButtonModule,
		DomainGoalNameInput,
		DomainGoalTargetValueInput,
		DomainGoalTypeToggleSwitch,
		DomainSelect,
	],
	templateUrl: './create-domain-goal-form.html',
})
export class CreateDomainGoalForm implements OnInit {
	protected readonly formService = inject(CreateDomainGoalFormService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly created = output<DomainGoal>();

	protected nameFc = computed(() => this.formService.form.get('name') as FormControl<string>);

	protected isGoalBooleanFc = computed(
		() => this.formService.form.get('isGoalBoolean') as FormControl<boolean>,
	);
	protected isTargetValueInputVisible = signal(false);

	protected targetValueFc = computed(
		() => this.formService.form.get('targetValue') as FormControl<number>,
	);

	protected domainIdFc = computed(
		() => this.formService.form.get('domainId') as FormControl<number | null>,
	);

	ngOnInit(): void {
		this.formService.form
			.get('isGoalBoolean')
			?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (isGoalBoolean) => this.isTargetValueInputVisible.set(!isGoalBoolean),
			});
	}

	protected createDomainGoal() {
		this.formService
			.createDomainGoal()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (createdDomainGoal) => {
					this.created.emit(createdDomainGoal);

					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Creation Success',
						detail: 'Successfully created your new domain goal!',
					});
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
