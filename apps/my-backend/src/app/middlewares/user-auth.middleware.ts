import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    console.log(authorization)
    if (!authorization) {
      return res.status(403).send({ message: 'No authentication token provided' });
    }
    if(authorization === '123'){
        next();
    }
    else{
        return res.status(403).send({ message: 'Unauthorized user' });
    }
    
  }
}
