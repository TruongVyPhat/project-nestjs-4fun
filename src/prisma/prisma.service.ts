import {
	Injectable,
	OnModuleInit,
	OnModuleDestroy,
	INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
		this.$connect.arguments
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.then(() => {})
			.catch((e: any) => {
				console.log(e);
			});
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
