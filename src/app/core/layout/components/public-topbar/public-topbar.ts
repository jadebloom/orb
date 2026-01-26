import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';
import { ColorSchemeConfigurator } from '@core/theme/components/color-scheme-configurator/color-scheme-configurator';

@Component({
	selector: 'orb-public-topbar',
	imports: [ButtonModule, DarkModeToggle, ColorSchemeConfigurator],
	templateUrl: './public-topbar.html',
})
export class PublicTopbar {
	visitGithub() {
		window.open('https://github.com/the-jade-chamber/orb', '_blank', 'noopener,noreferrer');
	}
}
