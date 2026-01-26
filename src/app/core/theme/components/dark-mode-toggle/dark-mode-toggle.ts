import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DarkModeService } from '@core/theme/services/dark-mode/dark-mode.service';

@Component({
	selector: 'orb-dark-mode-toggle',
	imports: [ButtonModule],
	templateUrl: './dark-mode-toggle.html',
})
export class DarkModeToggle {
	protected readonly darkModeService = inject(DarkModeService);
}
