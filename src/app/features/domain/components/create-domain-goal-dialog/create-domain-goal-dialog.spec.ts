import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDomainGoalDialog } from './create-domain-goal-dialog';

describe('CreateDomainGoalDialog', () => {
	let component: CreateDomainGoalDialog;
	let fixture: ComponentFixture<CreateDomainGoalDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateDomainGoalDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateDomainGoalDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
