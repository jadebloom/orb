import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StartupService } from '@core/startup/services/startup-service/startup.service';
import { PublicTopbar } from '@core/layout/components/public-topbar/public-topbar';
import { Preloading } from '@core/layout/components/preloading/preloading';
import { GlobalToasts } from '@core/layout/components/global-toasts/global-toasts';

@Component({
	selector: 'orb-layout',
	imports: [RouterOutlet, PublicTopbar, Preloading, GlobalToasts],
	templateUrl: './layout.html',
	providers: [MessageService],
})
export class Layout {
	protected readonly startupService = inject(StartupService);
}
