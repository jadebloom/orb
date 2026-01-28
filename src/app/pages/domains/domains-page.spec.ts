import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsPage } from './domains-page';

describe('DomainsPage', () => {
	let component: DomainsPage;
	let fixture: ComponentFixture<DomainsPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainsPage],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainsPage);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
