import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service.spec';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserService } from 'src/user/user.service';
@Module({
	imports: [
		UserModule,
		// PrismaModule.forFeature([UserRepository]),
		PassportModule,
		JwtModule.register({
			secret: 'JWT_SECRET_KEY',
			signOptions: { expiresIn: '60m' },
		}),
	],
	providers: [AuthService, UserService, LocalStrategy, JsonWebTokenStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
