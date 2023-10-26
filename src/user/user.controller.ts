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
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
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
	@SerializeOptions({ groups: [GROUPS.PRIVATE] })
	async getAllUsers(
		@Query() options?: GetOptions,
		@Query('email') email?: string,
	): Promise<UserOutDto[]> {
		try {
			const users = await this.userService.getUsers(email, options);
			if (!users || users.length <= 0)
				throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
			return plainToClass(UserOutDto, users, {
				// this option must be required and eq with @SerializeOptions for prisma model but not need with TypeORM model
				groups: [GROUPS.PRIVATE],
			});
		} catch (error: any) {
			throw error;
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
