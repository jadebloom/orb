import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainGoalTargetValueInput } from './domain-goal-target-value-input';

describe('DomainGoalTargetValueInput', () => {
	let component: DomainGoalTargetValueInput;
	let fixture: ComponentFixture<DomainGoalTargetValueInput>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainGoalTargetValueInput],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainGoalTargetValueInput);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
