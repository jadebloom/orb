import { Component, inject, input } from '@angular/core';
import { Domain } from '@core/database/models/domain';
import { UpdateDomainForm } from '@features/domain/components/update-domain-form/update-domain-form';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'orb-update-domain-dialog',
	imports: [UpdateDomainForm],
	templateUrl: './update-domain-dialog.html',
})
export class UpdateDomainDialog {
	private readonly dynamicDialogRef = inject(DynamicDialogRef);

	domain = input.required<Domain>();

	protected onDomainUpdated() {
		this.dynamicDialogRef.close(true);
	}
}
