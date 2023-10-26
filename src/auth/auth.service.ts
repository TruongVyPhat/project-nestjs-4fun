import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import * as moment from 'moment';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { LoginUserDto } from 'src/user/dto';
import { RegisterUserDto } from 'src/user/dto/register.user.dto';
import { AuthResponse } from './interfaces/auth-response.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 12);
	}

	async comparePassword(
		password: string,
		storePasswordHash: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, storePasswordHash);
	}

	async authentication(login: LoginUserDto): Promise<User | boolean> {
		const user = await this.userService.getUserByEmail(login.email);
		const check = await this.comparePassword(login.password, user.password);

		if (!check) {
			return false;
		}
		return user;
	}

	public getCookieForLogOut() {
		return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
	}

	async generateJwtToken(user: User): Promise<AuthResponse> {
		const payload: AuthPayload = { ...user };
		const expiresTime = 100;
		const auth: AuthResponse = {
			expiresIn: moment().add(expiresTime, 'days'),
			token: this.jwtService.sign(payload),
		};
		return auth;
	}

	async createUser(input: RegisterUserDto): Promise<User> {
		input.password = await this.hashPassword(input.password);
		return this.userService.createUser(input);
	}
}
