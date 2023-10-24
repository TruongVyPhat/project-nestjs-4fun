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
	Param,
	ParseIntPipe,
	HttpException,
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
import { NOT_FOUND } from 'src/pulbic/constant/messages';

// @ApiBearerAuth()
@ApiTags('user')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiQuery({ name: 'email', type: String, required: false })
	// @SerializeOptions({ groups: [GROUPS.PRIVATE] })
	async getAllUsers(
		@Query() options?: GetOptions,
		@Query('email') email?: string,
	): Promise<UserOutDto[]> {
		try {
			const users = await this.userService.getUsers(email, options);
			if (!users || users.length <= 0)
				throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
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
	// @ApiBody({ type: UserInDto, required: false })
	// @ApiQuery({
	// 	enumName: 'role',
	// 	name: 'role',
	// 	enum: UserRole,
	// 	isArray: false,
	// })
	@ApiQuery({ name: 'email', type: String, required: false })
	async findByReq(
		@Param('id', ParseIntPipe) id: number,
	): Promise<UserOutDto> {
		const user = await this.userService.getUserById(id);
		if (user) {
			return plainToClass(UserOutDto, user);
		} else {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
