import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('[Middleware] rodando...');

    const auth = req.headers.authorization;

    if (auth) {
      console.log('Usuário autenticado com token: ' + auth);
      return next();
    } else {
      res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    next();
  }
}
