import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { StartupService } from '@core/startup/services/startup-service/startup.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: '.orb-dark-mode',
					cssLayer: {
						name: 'primeng',
						order: 'theme, base, primeng',
					},
				},
			},
		}),
		provideAppInitializer(() => {
			const startupService = inject(StartupService);

			startupService.runOnStartup();
		}),
	],
};
