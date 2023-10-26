import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { GetOptions } from 'src/dto/request/GetOptions';
import { CREATION_FAILED, NOT_FOUND } from 'src/pulbic/constant/messages';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	public async getUserById(id: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	public async getUsers(
		name?: string,
		options?: GetOptions,
	): Promise<User[]> {
		return this.prisma.user.findMany({
			where: { name: { contains: name } },
			...options,
		});
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { email: email },
		});
		if (!user) {
			throw new BadRequestException(NOT_FOUND);
		}
		return user;
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
