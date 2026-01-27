import { inject, Injectable } from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { User } from '@core/database/models/user';
import { UserService } from '@core/database/services/user/user.service';

@Injectable({ providedIn: 'root' })
export class FetchAccountService {
	private readonly userService = inject(UserService);

	fetchAccount(): Observable<User> {
		return defer(() => from(this.userService.fetchUser()));
	}
}
