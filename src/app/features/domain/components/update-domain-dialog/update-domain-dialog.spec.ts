import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDomainDialog } from './update-domain-dialog';

describe('UpdateDomainDialog', () => {
	let component: UpdateDomainDialog;
	let fixture: ComponentFixture<UpdateDomainDialog>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UpdateDomainDialog],
		}).compileComponents();

		fixture = TestBed.createComponent(UpdateDomainDialog);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
