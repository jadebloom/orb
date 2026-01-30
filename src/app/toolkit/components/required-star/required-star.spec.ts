import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredStar } from './required-star';

describe('RequiredStar', () => {
	let component: RequiredStar;
	let fixture: ComponentFixture<RequiredStar>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RequiredStar],
		}).compileComponents();

		fixture = TestBed.createComponent(RequiredStar);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
