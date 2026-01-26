import { Component, inject } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ColorSchemeService } from '@core/theme/services/color-scheme/color-scheme.service';
import { PrimaryColorScheme } from '@core/theme/enums/primary-color-scheme';
import { SurfaceColorScheme } from '@core/theme/enums/surface-color-scheme';

@Component({
	selector: 'orb-color-scheme-configurator',
	imports: [StyleClassModule, ButtonModule, PopoverModule],
	templateUrl: './color-scheme-configurator.html',
})
export class ColorSchemeConfigurator {
	protected readonly colorSchemeService = inject(ColorSchemeService);

	protected isNoir(color: PrimaryColorScheme) {
		return color == PrimaryColorScheme.NOIR;
	}

	protected isSelectedPrimaryColor(color: PrimaryColorScheme) {
		return color == this.colorSchemeService.selectedPrimaryColor();
	}

	protected isSelectedSurfaceColor(color: SurfaceColorScheme) {
		return color == this.colorSchemeService.selectedSurfaceColor();
	}
}
