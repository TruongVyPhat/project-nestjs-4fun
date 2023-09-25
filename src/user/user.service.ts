import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { GetOptions } from 'src/dto/request/GetOptions';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	public async getUserById(
		userWhereUniqueInput: Prisma.UserWhereUniqueInput,
	): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: userWhereUniqueInput,
		});
	}

	public async getUsers(params: GetOptions): Promise<User[]> {
		console.log(params);
		return this.prisma.user.findMany(params);
	}

	public async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({ data });
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
