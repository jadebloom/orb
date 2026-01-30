import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainGoalsTable } from './domain-goals-table';

describe('DomainGoalsTable', () => {
	let component: DomainGoalsTable;
	let fixture: ComponentFixture<DomainGoalsTable>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainGoalsTable],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainGoalsTable);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
