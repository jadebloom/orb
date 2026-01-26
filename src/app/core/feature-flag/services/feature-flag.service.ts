import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
	private readonly featureFlags = signal<{ [name: string]: boolean }>({});

	setFlag(name: string, state: boolean) {
		this.featureFlags.update((p) => ({ ...p, [name]: state }));
	}

	isFlagEnabled(name: string) {
		return !!this.featureFlags()[name];
	}
}
