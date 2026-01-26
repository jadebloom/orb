import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTopbar } from './private-topbar';

describe('PrivateTopbar', () => {
	let component: PrivateTopbar;
	let fixture: ComponentFixture<PrivateTopbar>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PrivateTopbar],
		}).compileComponents();

		fixture = TestBed.createComponent(PrivateTopbar);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
