import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDomainGoalForm } from './create-domain-goal-form';

describe('CreateDomainGoalForm', () => {
	let component: CreateDomainGoalForm;
	let fixture: ComponentFixture<CreateDomainGoalForm>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateDomainGoalForm],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateDomainGoalForm);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
