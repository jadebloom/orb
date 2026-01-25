import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeConfigurator } from './color-scheme-configurator';

describe('ColorSchemeConfigurator', () => {
	let component: ColorSchemeConfigurator;
	let fixture: ComponentFixture<ColorSchemeConfigurator>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ColorSchemeConfigurator],
		}).compileComponents();

		fixture = TestBed.createComponent(ColorSchemeConfigurator);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
