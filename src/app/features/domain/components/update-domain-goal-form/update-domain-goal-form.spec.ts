import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDomainGoalForm } from './update-domain-goal-form';

describe('UpdateDomainGoalForm', () => {
	let component: UpdateDomainGoalForm;
	let fixture: ComponentFixture<UpdateDomainGoalForm>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UpdateDomainGoalForm],
		}).compileComponents();

		fixture = TestBed.createComponent(UpdateDomainGoalForm);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
