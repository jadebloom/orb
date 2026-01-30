import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDomainGoalDialog } from './delete-domain-goal-dialog';

describe('DeleteDomainGoalDialog', () => {
	let component: DeleteDomainGoalDialog;
	let fixture: ComponentFixture<DeleteDomainGoalDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DeleteDomainGoalDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(DeleteDomainGoalDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
