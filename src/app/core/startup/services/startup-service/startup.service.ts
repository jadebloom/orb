import { inject, Injectable, signal } from '@angular/core';
import { FeatureFlagService } from '@core/feature-flag/services/feature-flag.service';
import { DarkModeService } from '@core/theme/services/dark-mode/dark-mode.service';

@Injectable({ providedIn: 'root' })
export class StartupService {
	private readonly featureFlagService = inject(FeatureFlagService);
	private readonly darkModeService = inject(DarkModeService);

	private readonly _isStartupFinished = signal(false);
	readonly isStartupFinished = this._isStartupFinished.asReadonly();

	runOnStartup() {
		const isElectron = !!(window as any).electronAPI;

		this.featureFlagService.setFlag('isAppDemo', !isElectron);

		this.darkModeService.loadMode();

		this._isStartupFinished.set(true);
	}
}
