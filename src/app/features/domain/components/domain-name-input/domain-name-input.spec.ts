import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainNameInput } from './domain-name-input';

describe('DomainNameInput', () => {
	let component: DomainNameInput;
	let fixture: ComponentFixture<DomainNameInput>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainNameInput],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainNameInput);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
