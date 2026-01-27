import { Routes } from '@angular/router';
import { Layout } from '@core/layout/components/layout/layout';
import { authGuard } from '@core/security/guards/auth/auth-guard';
import { AccountPage } from './account-page';

export default [
	{
		path: 'account',
		component: Layout,
		canActivateChild: [authGuard],
		children: [
			{
				title: 'Orb. Your account',
				path: '',
				component: AccountPage,
			},
		],
	},
] as Routes;
