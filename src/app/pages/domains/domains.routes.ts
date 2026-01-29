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
			{
				path: ':id',
				children: [
					{
						title: 'Orb. Your domain',
						path: '',
						loadComponent: () =>
							import('src/app/pages/domains/:id/domain-page').then((m) => m.DomainPage),
					},
					{
						title: 'Orb. Domain goals',
						path: 'goals',
						loadComponent: () =>
							import('@pages/domains/:id/goals/domain-goals-page').then((m) => m.DomainGoalsPage),
					},
				],
			},
		],
	},
] as Routes;
