import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // to remove not need props from req Dto
			transform: true,
			transformOptions: {
				enableImplicitConversion: true, // this option using for tranfer props in plain Obj & query param Obj
			},
		}),
	);

	const options = new DocumentBuilder()
		.setTitle('Fucking RealShit NestJS App of Fatnef')
		.setDescription("Hello mother fcker. I'm back")
		.setVersion('1.0')
		.setBasePath('api')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/docs', app, document);

	const prismaService: PrismaService = app.get(PrismaService);
	prismaService.enableShutdownHooks(app);

	await app.listen(3000);
}
bootstrap();
