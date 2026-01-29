import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDomainForm } from './update-domain-form';

describe('UpdateDomainForm', () => {
	let component: UpdateDomainForm;
	let fixture: ComponentFixture<UpdateDomainForm>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UpdateDomainForm],
		}).compileComponents();

		fixture = TestBed.createComponent(UpdateDomainForm);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
