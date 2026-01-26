import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preloading } from './preloading';

describe('Preloading', () => {
	let component: Preloading;
	let fixture: ComponentFixture<Preloading>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Preloading],
		}).compileComponents();

		fixture = TestBed.createComponent(Preloading);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
