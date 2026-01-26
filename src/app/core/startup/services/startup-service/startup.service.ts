import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '@core/database/services/user/user.service';
import { DarkModeService } from '@core/theme/services/dark-mode/dark-mode.service';
import { ColorSchemeService } from '@core/theme/services/color-scheme/color-scheme.service';

@Injectable({ providedIn: 'root' })
export class StartupService {
	private readonly userService = inject(UserService);
	private readonly darkModeService = inject(DarkModeService);
	private readonly colorSchemeService = inject(ColorSchemeService);

	private readonly _isStartupFinished = signal(false);
	readonly isStartupFinished = this._isStartupFinished.asReadonly();

	async runOnStartup() {
		const doesUserExist = await this.userService.doesUserExistInDatabase();
		this.userService.doesUserExist.set(doesUserExist);

		this.darkModeService.loadMode();
		this.colorSchemeService.loadPreferences();

		this._isStartupFinished.set(true);
	}
}
