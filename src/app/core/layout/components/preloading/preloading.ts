import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
	selector: 'orb-preloading',
	imports: [ProgressSpinnerModule],
	templateUrl: './preloading.html',
})
export class Preloading {}
