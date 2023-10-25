import { User, UserRole } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export enum GROUPS {
	PRIVATE = 'PRIVATE',
	PUBLIC = 'PUBLIC',
}

export class UserInDto {
	constructor(private readonly user: User) {}

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	uuid: string;

	@ApiProperty()
	@IsNotEmpty()
	role: UserRole;
}

export class UserOutDto implements User {
	id: number;
	name: string;
	email: string;

	@Expose({ groups: [GROUPS.PRIVATE] })
	uuid: string;

	@Expose({ groups: [GROUPS.PRIVATE] })
	role: UserRole;

	@Exclude()
	createdAt: Date;

	@Exclude()
	updatedAt: Date;

	constructor(partial: Partial<UserOutDto>) {
		Object.assign(this, partial);
	}
}

export class ListUserOutDto {
	result: UserOutDto[];
}
