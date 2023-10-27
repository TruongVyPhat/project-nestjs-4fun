import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class RegisterUserDto {
	@ApiProperty()
	@IsString()
	@MaxLength(255)
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}
