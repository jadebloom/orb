import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth-guard';
import { Layout } from '@core/layout/components/layout/layout';
import { AuthenticationPage } from '@pages/authentication/authentication-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { HomePage } from '@pages/home-page';

export default [
	{
		path: '',
		component: Layout,
		canActivateChild: [authGuard],
		children: [
			{
				title: 'Orb. Home Page',
				path: '',
				component: HomePage,
			},
		],
	},
	{
		path: 'authentication',
		component: Layout,
		children: [
			{
				title: 'Orb. Authentication',
				path: '',
				component: AuthenticationPage,
			},
		],
	},
	{
		path: 'not-found',
		component: Layout,
		children: [
			{
				title: 'Orb. Not Found',
				path: '',
				component: NotFoundPage,
			},
		],
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
] as Routes;
