import { Injectable, signal } from '@angular/core';
import { updatePreset, updateSurfacePalette } from '@primeuix/themes';
import { PaletteDesignToken } from '@primeuix/themes/types';
import { PrimaryColorScheme } from '@core/theme/enums/primary-color-scheme';
import { SurfaceColorScheme } from '@core/theme/enums/surface-color-scheme';

@Injectable({ providedIn: 'root' })
export class ColorSchemeService {
	private readonly _selectedPrimaryColor = signal<PrimaryColorScheme>(PrimaryColorScheme.NOIR);
	private readonly _selectedSurfaceColor = signal<SurfaceColorScheme>(SurfaceColorScheme.GRAY);
	readonly selectedPrimaryColor = this._selectedPrimaryColor.asReadonly();
	readonly selectedSurfaceColor = this._selectedSurfaceColor.asReadonly();

	readonly primaryColors: PrimaryColorScheme[] = [
		PrimaryColorScheme.NOIR,
		PrimaryColorScheme.EMERALD,
		PrimaryColorScheme.GREEN,
		PrimaryColorScheme.LIME,
		PrimaryColorScheme.ORANGE,
		PrimaryColorScheme.AMBER,
		PrimaryColorScheme.YELLOW,
		PrimaryColorScheme.TEAL,
		PrimaryColorScheme.CYAN,
		PrimaryColorScheme.SKY,
		PrimaryColorScheme.BLUE,
		PrimaryColorScheme.INDIGO,
		PrimaryColorScheme.VIOLET,
		PrimaryColorScheme.PURPLE,
		PrimaryColorScheme.FUCHSIA,
		PrimaryColorScheme.PINK,
		PrimaryColorScheme.ROSE,
	];

	readonly surfaceColors: SurfaceColorScheme[] = [
		SurfaceColorScheme.SLATE,
		SurfaceColorScheme.GRAY,
		SurfaceColorScheme.ZINC,
		SurfaceColorScheme.NEUTRAL,
		SurfaceColorScheme.STONE,
	];

	updatePrimaryColor(color: PrimaryColorScheme) {
		this._selectedPrimaryColor.set(color);

		updatePreset(this.getPrimaryColorPreset());
	}

	updateSurfaceColor(color: SurfaceColorScheme) {
		this._selectedSurfaceColor.set(color);

		updateSurfacePalette(this.getSurfaceColorTokens());
	}

	private getPrimaryColorPreset() {
		const color = this.selectedPrimaryColor();

		if (color == PrimaryColorScheme.NOIR) {
			return {
				semantic: {
					primary: {
						50: '{surface.50}',
						100: '{surface.100}',
						200: '{surface.200}',
						300: '{surface.300}',
						400: '{surface.400}',
						500: '{surface.500}',
						600: '{surface.600}',
						700: '{surface.700}',
						800: '{surface.800}',
						900: '{surface.900}',
						950: '{surface.950}',
					},
					colorScheme: {
						light: {
							primary: {
								color: '{primary.950}',
								contrastColor: '#ffffff',
								hoverColor: '{primary.800}',
								activeColor: '{primary.700}',
							},
							highlight: {
								background: '{primary.950}',
								focusBackground: '{primary.700}',
								color: '#ffffff',
								focusColor: '#ffffff',
							},
						},
						dark: {
							primary: {
								color: '{primary.50}',
								contrastColor: '{primary.950}',
								hoverColor: '{primary.200}',
								activeColor: '{primary.300}',
							},
							highlight: {
								background: '{primary.50}',
								focusBackground: '{primary.300}',
								color: '{primary.950}',
								focusColor: '{primary.950}',
							},
						},
					},
				},
			};
		}

		return {
			semantic: {
				primary: {
					50: `{${color}.50}`,
					100: `{${color}.100}`,
					200: `{${color}.200}`,
					300: `{${color}.300}`,
					400: `{${color}.400}`,
					500: `{${color}.500}`,
					600: `{${color}.600}`,
					700: `{${color}.700}`,
					800: `{${color}.800}`,
					900: `{${color}.900}`,
					950: `{${color}.950}`,
				},
				colorScheme: {
					light: {
						primary: {
							color: '{primary.500}',
							contrastColor: '#ffffff',
							hoverColor: '{primary.600}',
							activeColor: '{primary.700}',
						},
						highlight: {
							background: '{primary.50}',
							focusBackground: '{primary.100}',
							color: '{primary.700}',
							focusColor: '{primary.800}',
						},
					},
					dark: {
						primary: {
							color: '{primary.400}',
							contrastColor: '{surface.900}',
							hoverColor: '{primary.300}',
							activeColor: '{primary.200}',
						},
						highlight: {
							background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
							focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
							color: 'rgba(255,255,255,.87)',
							focusColor: 'rgba(255,255,255,.87)',
						},
					},
				},
			},
		};
	}

	private getSurfaceColorTokens(): PaletteDesignToken {
		return {
			0: `{${this.selectedSurfaceColor()}.0}`,
			50: `{${this.selectedSurfaceColor()}.50}`,
			100: `{${this.selectedSurfaceColor()}.100}`,
			200: `{${this.selectedSurfaceColor()}.200}`,
			300: `{${this.selectedSurfaceColor()}.300}`,
			400: `{${this.selectedSurfaceColor()}.400}`,
			500: `{${this.selectedSurfaceColor()}.500}`,
			600: `{${this.selectedSurfaceColor()}.600}`,
			700: `{${this.selectedSurfaceColor()}.700}`,
			800: `{${this.selectedSurfaceColor()}.800}`,
			900: `{${this.selectedSurfaceColor()}.900}`,
			950: `{${this.selectedSurfaceColor()}.950}`,
		};
	}
}
