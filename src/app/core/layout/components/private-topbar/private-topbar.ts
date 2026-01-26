import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';
import { ColorSchemeConfigurator } from '@core/theme/components/color-scheme-configurator/color-scheme-configurator';
import { Menu } from '@core/layout/components/menu/menu';

@Component({
	selector: 'orb-private-topbar',
	imports: [ButtonModule, DarkModeToggle, ColorSchemeConfigurator, Menu],
	templateUrl: './private-topbar.html',
})
export class PrivateTopbar {
	protected visitGithub() {
		window.open('https://github.com/the-jade-chamber/orb', '_blank', 'noopener,noreferrer');
	}
}
