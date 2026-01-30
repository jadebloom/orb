import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainSelect } from './domain-select';

describe('DomainSelect', () => {
	let component: DomainSelect;
	let fixture: ComponentFixture<DomainSelect>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainSelect],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainSelect);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
