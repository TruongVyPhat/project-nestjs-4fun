import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
		// ở đây mình đăng nhập bằng email và password nên mình phải thực hiện custom usernameField
	}

	// async validate(email: string, password: string): Promise<User> {
	// 	const user = await this.authService.authentication(email, password);
	// 	if (!user) {
	// 		throw new UnauthorizedException();
	// 	}

	// 	return user;
	// }
}
