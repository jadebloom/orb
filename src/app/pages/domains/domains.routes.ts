import { Routes } from '@angular/router';
import { Layout } from '@core/layout/components/layout/layout';
import { authGuard } from '@core/security/guards/auth/auth-guard';

export default [
	{
		path: 'domains',
		component: Layout,
		canActivateChild: [authGuard],
		children: [
			{
				title: 'Orb. Your domains',
				path: '',
				loadComponent: () =>
					import('src/app/pages/domains/domains-page').then((m) => m.DomainsPage),
			},
		],
	},
] as Routes;
