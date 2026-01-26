import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClass } from 'primeng/styleclass';

@Component({
	selector: 'orb-menu',
	imports: [ButtonModule, StyleClass],
	templateUrl: './menu.html',
})
export class Menu {
	protected readonly sections = [
		{
			sectionName: 'Source',
			items: [
				{
					label: 'View documentation',
					icon: 'pi pi-github',
					action: () =>
						window.open('https://github.com/the-jade-chamber/orb', '_blank', 'noopener,noreferrer'),
				},
				{
					label: 'See author',
					icon: 'pi pi-github',
					action: () =>
						window.open('https://github.com/jadebloom', '_blank', 'noopener,noreferrer'),
				},
			],
		},
	];
}
