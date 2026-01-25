import { inject, Injectable } from '@angular/core';
import { DarkModeService } from '@core/theme/services/dark-mode/dark-mode.service';

@Injectable({ providedIn: 'root' })
export class StartupService {
	private readonly darkModeService = inject(DarkModeService);

	runOnStartup() {
		this.darkModeService.loadMode();
	}
}
