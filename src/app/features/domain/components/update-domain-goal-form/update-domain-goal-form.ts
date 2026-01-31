import {
	Component,
	computed,
	DestroyRef,
	inject,
	input,
	OnInit,
	output,
	signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DEFAULT_ERROR_MESSAGE } from '@core/constants/messages';
import { DomainGoal } from '@core/database/models/domain-goal';
import { UpdateDomainGoalFormService } from '@features/domain/services/update-domain-goal-form/update-domain-goal-form.service';
import { DomainGoalNameInput } from '@features/domain/components/domain-goal-name-input/domain-goal-name-input';
import { DomainGoalTypeToggleSwitch } from '@features/domain/components/domain-goal-type-toggle-switch/domain-goal-type-toggle-switch';
import { DomainGoalTargetValueInput } from '@features/domain/components/domain-goal-target-value-input/domain-goal-target-value-input';
import { DomainSelect } from '@features/domain/components/domain-select/domain-select';

@Component({
	selector: 'orb-update-domain-goal-form',
	imports: [
		ReactiveFormsModule,
		ButtonModule,
		DomainGoalNameInput,
		DomainGoalTypeToggleSwitch,
		DomainGoalTargetValueInput,
		DomainSelect,
	],
	templateUrl: './update-domain-goal-form.html',
})
export class UpdateDomainGoalForm implements OnInit {
	protected readonly formService = inject(UpdateDomainGoalFormService);
	private readonly messageService = inject(MessageService);
	private readonly destroyRef = inject(DestroyRef);

	readonly initialDomainGoal = input.required<DomainGoal>();
	readonly onUpdate = output<DomainGoal>();

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
		this.formService.form.get('name')?.setValue(this.initialDomainGoal().name);
		this.formService.form.get('isGoalBoolean')?.setValue(this.initialDomainGoal().isGoalBoolean);
		this.formService.form.get('targetValue')?.setValue(this.initialDomainGoal().targetValue);
		this.formService.form.get('domainId')?.setValue(this.initialDomainGoal().domainId);
		this.isTargetValueInputVisible.set(!this.initialDomainGoal().isGoalBoolean);

		this.formService.form
			.get('isGoalBoolean')
			?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (isGoalBoolean) => this.isTargetValueInputVisible.set(!isGoalBoolean),
			});
	}

	protected updateDomainGoal() {
		const domainGoalId = this.initialDomainGoal()?.id;

		if (domainGoalId == null) return;

		this.formService
			.updateDomainGoal(domainGoalId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (updatedDomainGoal) => {
					this.onUpdate.emit(updatedDomainGoal);

					this.messageService.add({
						key: 'main',
						severity: 'success',
						summary: 'Update Success',
						detail: 'Successfully updated the domain goal!',
					});
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
