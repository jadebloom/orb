import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StartupService } from '@core/startup/services/startup-service/startup.service';
import { AuthenticationService } from '@core/security/services/authentication/authentication.service';
import { PublicTopbar } from '@core/layout/components/public-topbar/public-topbar';
import { Preloading } from '@core/layout/components/preloading/preloading';
import { GlobalToasts } from '@core/layout/components/global-toasts/global-toasts';
import { PrivateTopbar } from '@core/layout/components/private-topbar/private-topbar';

@Component({
	selector: 'orb-layout',
	imports: [RouterOutlet, PublicTopbar, Preloading, GlobalToasts, PrivateTopbar],
	templateUrl: './layout.html',
	providers: [MessageService],
})
export class Layout {
	protected readonly startupService = inject(StartupService);
	protected readonly authenticationService = inject(AuthenticationService);
}
