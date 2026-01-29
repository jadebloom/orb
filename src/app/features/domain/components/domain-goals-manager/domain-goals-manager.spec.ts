import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainGoalsManager } from './domain-goals-manager';

describe('DomainGoalsManager', () => {
	let component: DomainGoalsManager;
	let fixture: ComponentFixture<DomainGoalsManager>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainGoalsManager],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainGoalsManager);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
