import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllDomainsDialog } from './delete-all-domains-dialog';

describe('DeleteAllDomainsDialog', () => {
	let component: DeleteAllDomainsDialog;
	let fixture: ComponentFixture<DeleteAllDomainsDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DeleteAllDomainsDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(DeleteAllDomainsDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
