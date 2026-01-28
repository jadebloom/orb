import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainPreview } from './domain-preview';

describe('DomainPreview', () => {
	let component: DomainPreview;
	let fixture: ComponentFixture<DomainPreview>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DomainPreview],
		}).compileComponents();

		fixture = TestBed.createComponent(DomainPreview);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
