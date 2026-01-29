import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainGoalsPage } from './domain-goals-page';

describe('DomainGoalsPage', () => {
	let component: DomainGoalsPage;
	let fixture: ComponentFixture<DomainGoalsPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainGoalsPage],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainGoalsPage);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
