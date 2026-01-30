import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainGoalTypeToggleSwitch } from './domain-goal-type-toggle-switch';

describe('DomainGoalTypeToggleSwitch', () => {
	let component: DomainGoalTypeToggleSwitch;
	let fixture: ComponentFixture<DomainGoalTypeToggleSwitch>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainGoalTypeToggleSwitch],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainGoalTypeToggleSwitch);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
