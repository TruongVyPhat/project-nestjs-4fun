import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

@Injectable()
export class ValidateRequestMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	use(req: Request, res: Response, next: NextFunction) {
		if (true) {
			console.log('do middle');
			res.json('a');
			if (req.body == 'hey girl') return true;
		}
		next();
	}
}
