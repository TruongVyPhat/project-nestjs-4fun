import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ParseIntPipe } from '@nestjs/common';

export class GetOptions {
	@ApiProperty({ name: 'take', type: Number, required: false, default: 20 })
	@IsInt()
	// @Transform((req) => parseInt(req.value), { toClassOnly: true })
	// @IsNumberString()
	public take: number;

	@ApiProperty({ name: 'skip', type: Number, required: false, default: 0 })
	@IsInt()
	// @Transform((req) => parseInt(req.value), { toClassOnly: true })
	// @IsNumberString()
	public skip: number;
}
