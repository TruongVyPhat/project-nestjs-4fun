import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/user/user.service';
@Module({
	imports: [
		UserModule,
		PrismaModule,
		PassportModule,
		JwtModule.register({
			secret: 'JWT_SECRET_KEY',
			signOptions: { expiresIn: '60m' },
		}),
	],
	providers: [AuthService, UserService, LocalStrategy, JsonWebTokenStrategy],
	controllers: [AuthController],
})
export class AuthModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer
			.apply()
			.exclude({ path: 'auth/login', method: RequestMethod.POST });
		// .forRoutes(AuthController);
	}
}
