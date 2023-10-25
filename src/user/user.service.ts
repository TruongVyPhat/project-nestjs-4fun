import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { GetOptions } from 'src/dto/request/GetOptions';
import { CREATION_FAILED } from 'src/pulbic/constant/messages';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	public async getUserById(id: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	public async getUsers(
		email?: string,
		options?: GetOptions,
	): Promise<User[]> {
		return this.prisma.user.findMany({
			where: { email: { contains: email } },
			...options,
		});
	}

	public async createUser(data: Prisma.UserCreateInput): Promise<User> {
		try {
			return this.prisma.user.create({ data });
		} catch (e) {
			throw new HttpException(
				CREATION_FAILED,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	public async updateUser(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		return this.prisma.user.update(params);
	}

	public async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
		return this.prisma.user.delete({ where });
	}
}
