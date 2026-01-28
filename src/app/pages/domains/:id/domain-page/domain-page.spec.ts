import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainPage } from './domain-page';

describe('DomainPage', () => {
	let component: DomainPage;
	let fixture: ComponentFixture<DomainPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainPage],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainPage);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
