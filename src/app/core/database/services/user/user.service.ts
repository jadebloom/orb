import { Injectable, signal } from '@angular/core';
import { database } from '@core/database/db';
import { CreateUserPayload } from '@core/database/models/create-user-payload';
import { UpdateUserPayload } from '@core/database/models/update-user-payload';
import { User } from '@core/database/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
	readonly doesUserExist = signal(false);

	async createUser(payload: CreateUserPayload): Promise<User> {
		await database.user.add({ email: payload.email, password: payload.password });

		return { email: payload.email, password: payload.password };
	}

	async fetchUser(): Promise<User> {
		const users = await database.user.toArray();

		if (!users?.length) throw new Error("User couldn't be found");

		return users[0];
	}

	async verifyUser(password: string): Promise<User> {
		const user = await database.user.where('password').equals(password).first();

		if (!user) throw new Error("User couldn't be verified");

		return user;
	}

	async doesUserExistInDatabase(): Promise<boolean> {
		const cnt = await database.user.count();

		return cnt > 0;
	}

	async updateUser(payload: UpdateUserPayload) {
		const user = await this.fetchUser();

		database.user
			.where('email')
			.equals(user.email)
			.modify({ email: payload.email, password: payload.password });

		return { email: payload.email, password: payload.password } as User;
	}
}
