import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllDomainGoalsDialog } from './delete-all-domain-goals-dialog';

describe('DeleteAllDomainGoalsDialog', () => {
	let component: DeleteAllDomainGoalsDialog;
	let fixture: ComponentFixture<DeleteAllDomainGoalsDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DeleteAllDomainGoalsDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(DeleteAllDomainGoalsDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
