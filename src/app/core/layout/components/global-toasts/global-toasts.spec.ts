import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalToasts } from './global-toasts';

describe('GlobalToasts', () => {
	let component: GlobalToasts;
	let fixture: ComponentFixture<GlobalToasts>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GlobalToasts],
		}).compileComponents();

		fixture = TestBed.createComponent(GlobalToasts);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
