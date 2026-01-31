import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDomainGoalDialog } from './update-domain-goal-dialog';

describe('UpdateDomainGoalDialog', () => {
	let component: UpdateDomainGoalDialog;
	let fixture: ComponentFixture<UpdateDomainGoalDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UpdateDomainGoalDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(UpdateDomainGoalDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
