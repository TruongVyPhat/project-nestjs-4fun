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
		.setDescription(
			'Token nè: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwaGF0dHZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkUmRjeXdBY01jZHQ3VWRsS2ZMTUs3LkNubUwvY3FjaU5jd2JGTGFIOHlJeGkycUtmNzZjSnkiLCJuYW1lIjoicGhhdHR2Iiwicm9sZSI6IlVTRVIiLCJjcmVhdGVkQXQiOiIyMDIzLTEwLTI2VDA3OjE5OjMwLjA1M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTEwLTI2VDA3OjE5OjMwLjA1OFoiLCJpYXQiOjE2OTgzODg1MzgsImV4cCI6MTY5ODM5MjEzOH0.QCnOsYdkmIdUZeWu6CF_Rnl4A3BlwwL4nhlBUQaxj5o',
		)
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
