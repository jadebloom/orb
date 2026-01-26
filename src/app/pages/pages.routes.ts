import { Routes } from '@angular/router';
import { authGuard } from '@core/security/guards/auth/auth-guard';
import { Layout } from '@core/layout/components/layout/layout';
import { RegistrationPage } from '@pages/registration/registration-page';
import { LoginPage } from '@pages/login/login-page';
import { HomePage } from '@pages/home-page';
import { NotFoundPage } from '@pages/not-found/not-found-page';
import { protectRegistrationGuardGuard } from '@core/security/guards/protect-registration/protect-registration-guard-guard';
import { protectLoginGuardGuard } from '@core/security/guards/protect-login/protect-login-guard';

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
		path: 'registration',
		component: Layout,
		canActivate: [protectRegistrationGuardGuard],
		children: [
			{
				title: 'Orb. Registration',
				path: '',
				component: RegistrationPage,
			},
		],
	},
	{
		path: 'login',
		component: Layout,
		canActivate: [protectLoginGuardGuard],
		children: [
			{
				title: 'Orb. Login',
				path: '',
				component: LoginPage,
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
