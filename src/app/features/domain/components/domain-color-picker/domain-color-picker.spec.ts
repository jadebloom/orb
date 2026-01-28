import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainColorPicker } from './domain-color-picker';

describe('DomainColorPicker', () => {
	let component: DomainColorPicker;
	let fixture: ComponentFixture<DomainColorPicker>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainColorPicker],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainColorPicker);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
