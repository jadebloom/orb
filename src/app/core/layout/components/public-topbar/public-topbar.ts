import { Component } from '@angular/core';
import { DarkModeToggle } from '@core/theme/components/dark-mode-toggle/dark-mode-toggle';
import { ColorSchemeConfigurator } from '@core/theme/components/color-scheme-configurator/color-scheme-configurator';

@Component({
	selector: 'orb-public-topbar',
	imports: [DarkModeToggle, ColorSchemeConfigurator],
	templateUrl: './public-topbar.html',
})
export class PublicTopbar {}
