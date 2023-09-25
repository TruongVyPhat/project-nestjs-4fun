import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import { SECRET } from '../config';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		// const authHeaders = req.headers.authorization;
		// if (authHeaders && (authHeaders as string).split(' ')[1]) {
		// 	const token = (authHeaders as string).split(' ')[1];
		// 	const decoded: any = {email: 'email', password: 'password'}; //jwt.verify(token, SECRET);
		// const user = await this.userService.findById(decoded.id);

		// if (!user) {
		// 	throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
		// }
		// this.userService.findOne(decoded)
		// .then(user => {
		//req.user = user.user;
		//     next();
		// }).catch(error => {
		//     res.status(HttpStatus.NOT_FOUND).json(error);
		// })
		//     next()
		// } else {
		// 	throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
		// }
		if (true) res.status(302).json(HttpStatus.GONE);
	}
}
