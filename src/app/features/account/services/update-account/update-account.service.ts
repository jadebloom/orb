import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { User } from '@core/database/models/user';
import { UpdateAccountPayload } from '@features/account/models/update-account-payload';
import { UserService } from '@core/database/services/user/user.service';

@Injectable({ providedIn: 'root' })
export class UpdateAccountService {
	private readonly userService = inject(UserService);

	updateAccount(payload: UpdateAccountPayload): Observable<User> {
		return defer(() => from(this.userService.updateUser(payload)));
	}
}
