import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BooleanStateService {
	private readonly _state = signal(false);
	readonly state = this._state.asReadonly();

	set(state: boolean) {
		this._state.set(state);
	}

	toggle() {
		this._state.update((p) => !p);
	}
}
