import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticationGuard } from './guards/auth.guard';
// import { CreateUserDto } from './dto/CreateUser.dto';

@Controller()
export class AuthController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	//fucntion register user
	// @Post('/register')
	// async registerUser(@Body() input: CreateUserDto) {
	// 	const check = await this.validate(input.email);
	// 	if (!check) {
	// 		throw new HttpException(
	// 			{ message: 'User already exists' },
	// 			HttpStatus.BAD_REQUEST,
	// 		);
	// 	}

	// 	input.password = await this.authService.hashPassword(input.password);
	// 	return this.userService.create(input);
	// }

	//handle login
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Req() request): Promise<any> {
		return this.authService.login(request.user);
	}

	@UseGuards(AuthenticationGuard)
	@Get('users/:id')
	async getUserById(@Param() params): Promise<User> {
		const user = await this.userService.getUserById(params.id);
		return user;
	}

	//check user exists by email
	async validate(email: string) {
		try {
			const users = await this.userService.getUsers(email);
			return users.length <= 0;
		} catch (e) {
			return false;
		}
	}
}
