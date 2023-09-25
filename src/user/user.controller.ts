/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import {
	Get,
	Post,
	Controller,
	Query,
	Req,
	Res,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	ClassSerializerInterceptor,
	UseInterceptors,
	SerializeOptions,
} from '@nestjs/common';
import { Request, Response } from 'express';

import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRole } from '@prisma/client';
import { UserInDto, UserOutDto } from './dto';
import { GROUPS } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { GetOptions } from 'src/dto/request/GetOptions';

// @ApiBearerAuth()
@ApiTags('user')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOkResponse({ type: UserOutDto, isArray: true })
	// @SerializeOptions({ groups: [GROUPS.PRIVATE] })
	async getAllUsers(@Query() req: GetOptions): Promise<UserOutDto[]> {
		try {
			const users = await this.userService.getUsers(req);
			return plainToClass(UserOutDto, users);
		} catch (error: any) {
			throw error;
		}
	}

	@Post()
	@ApiBody({ type: UserInDto })
	@ApiCreatedResponse({ type: UserOutDto, description: 'shit is created' })
	async createUser(@Req() req: Request, @Res() res: Response) {
		try {
			const user = await this.userService.createUser(req.body);
			console.log(user);
			res.status(HttpStatus.CREATED).json(plainToClass(UserOutDto, user));
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.toString());
		}
	}

	@Get(':id')
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: UserInDto })
	@ApiQuery({
		enumName: 'role',
		name: 'role',
		enum: UserRole,
		isArray: false,
	})
	@ApiCreatedResponse({ type: UserInDto, description: 'shit is created' })
	@ApiOkResponse({ type: String, description: 'shit is oke to' })
	async findByReq(@Req() req: Request, @Res() res: Response) {
		res.status(200).json('ccc');
		// return req.body
		// return this.userService.get_user_by_fk(params)
	}
}
