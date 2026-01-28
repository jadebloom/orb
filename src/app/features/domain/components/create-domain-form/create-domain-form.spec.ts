import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDomainForm } from './create-domain-form';

describe('CreateDomainForm', () => {
	let component: CreateDomainForm;
	let fixture: ComponentFixture<CreateDomainForm>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateDomainForm],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateDomainForm);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
