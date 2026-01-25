import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEventPattern, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
	private readonly destroyRef = inject(DestroyRef);

	private readonly _isDarkMode = signal(false);
	readonly isDarkMode = this._isDarkMode.asReadonly();

	loadMode() {
		const mql = window.matchMedia('(prefers-color-scheme: dark)');

		if (mql.matches) this.setDarkMode();
		else this.setLightMode();

		const system$ = fromEventPattern<MediaQueryList>(
			(handler) => mql.addEventListener('change', handler),
			(handler) => mql.removeEventListener('change', handler),
		).pipe(
			takeUntilDestroyed(this.destroyRef),
			map((e) => e.matches),
		);

		system$.subscribe({
			next: (match) => {
				if (match) this.setDarkMode();
				else this.setLightMode();
			},
		});
	}

	setDarkMode() {
		this._isDarkMode.set(true);

		document.querySelector('html')?.classList.add('orb-dark-mode');
	}

	setLightMode() {
		this._isDarkMode.set(false);

		document.querySelector('html')?.classList.remove('orb-dark-mode');
	}

	toggleMode() {
		this._isDarkMode.update((p) => !p);

		document.querySelector('html')?.classList.toggle('orb-dark-mode');
	}
}
