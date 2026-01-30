import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainGoalNameInput } from './domain-goal-name-input';

describe('DomainGoalNameInput', () => {
	let component: DomainGoalNameInput;
	let fixture: ComponentFixture<DomainGoalNameInput>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainGoalNameInput],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainGoalNameInput);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
