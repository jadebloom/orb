import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDomainDialog } from './delete-domain-dialog';

describe('DeleteDomainDialog', () => {
	let component: DeleteDomainDialog;
	let fixture: ComponentFixture<DeleteDomainDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DeleteDomainDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(DeleteDomainDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
