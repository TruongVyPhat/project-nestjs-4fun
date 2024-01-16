import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString, IsOptional } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ParseIntPipe } from '@nestjs/common';

export class GetOptions {
	@ApiProperty({ name: 'take', type: Number, required: false })
	@IsOptional()
	@IsInt()
	// @Transform((req) => parseInt(req.value), { toClassOnly: true })
	// @IsNumberString()
	public take?: number;

	@ApiProperty({ name: 'skip', type: Number, required: false })
	@IsOptional()
	@IsInt()
	// @Transform((req) => parseInt(req.value), { toClassOnly: true })
	// @IsNumberString()
	public skip: number;
}
