import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticationGuard } from './guards/auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/user/dto/register.user.dto';
import { LoginUserDto, UserOutDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { AuthResponse } from './interfaces/auth-response.interface';
// import { CreateUserDto } from './dto/CreateUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private userService: UserService,
		private authService: AuthService,
	) {}

	// fucntion register user
	@Post('/register')
	async registerUser(@Body() input: RegisterUserDto): Promise<UserOutDto> {
		const check = await this.validateEmail(input.email);
		if (!check) {
			throw new BadRequestException('Email already exists');
		}
		const user = this.authService.createUser(input);
		if (!user) {
			throw new HttpException(
				'Registration Fail',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
		return plainToClass(UserOutDto, user);
	}

	//handle login
	@Post('/login')
	async login(@Body() request: LoginUserDto): Promise<AuthResponse> {
		const user = await this.authService.authentication(request);
		if (!user) {
			throw new UnauthorizedException();
		}
		return this.authService.generateJwtToken(user as User);
	}

	//check user exists by email
	private async validateEmail(email: string) {
		try {
			return !(await this.userService.getUserByEmail(email));
		} catch (e) {
			return false;
		}
	}
}
