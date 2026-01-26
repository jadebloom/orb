import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEventPattern, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
	private readonly destroyRef = inject(DestroyRef);

	private readonly _isDarkMode = signal(false);
	readonly isDarkMode = this._isDarkMode.asReadonly();

	loadMode() {
		const isDarkModeLs = localStorage.getItem('isDarkMode');

		if (isDarkModeLs == null) {
			const mql = window.matchMedia('(prefers-color-scheme: dark)');

			if (mql.matches) this.setDarkMode();
			else this.setLightMode();

			const mql$ = fromEventPattern<MediaQueryList>(
				(handler) => mql.addEventListener('change', handler),
				(handler) => mql.removeEventListener('change', handler),
			).pipe(
				takeUntilDestroyed(this.destroyRef),
				map((e) => e.matches),
			);
			mql$.subscribe({
				next: (match) => {
					if (match) this.setDarkMode();
					else this.setLightMode();
				},
			});
		}

		if (isDarkModeLs == 'true') {
			this.setDarkMode();
		} else if (isDarkModeLs == 'false') {
			this.setLightMode();
		}
	}

	setDarkMode() {
		this._isDarkMode.set(true);

		document.querySelector('html')?.classList.add('orb-dark-mode');

		localStorage.setItem('isDarkMode', 'true');
	}

	setLightMode() {
		this._isDarkMode.set(false);

		document.querySelector('html')?.classList.remove('orb-dark-mode');

		localStorage.setItem('isDarkMode', 'false');
	}

	toggleMode() {
		localStorage.setItem('isDarkMode', this._isDarkMode() ? 'false' : 'true');

		this._isDarkMode.update((p) => !p);

		document.querySelector('html')?.classList.toggle('orb-dark-mode');
	}
}
