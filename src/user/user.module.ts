import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [UserService, PrismaModule],
	controllers: [UserController],
	exports: [],
})
export class UserModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude(
				{ path: 'user/:id', method: RequestMethod.POST },
				{ path: 'user', method: RequestMethod.GET },
			);
		// .forRoutes(UserController);
	}
}
