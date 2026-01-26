import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'orb-global-toasts',
	imports: [ToastModule],
	templateUrl: './global-toasts.html',
})
export class GlobalToasts {}
