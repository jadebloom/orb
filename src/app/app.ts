import { Component } from '@angular/core';
import { PublicTopbar } from '@core/layout/components/public-topbar/public-topbar';

@Component({
	selector: 'app-root',
	template: '<orb-public-topbar />',
	imports: [PublicTopbar],
})
export class App {}
