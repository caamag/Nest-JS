import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    const { method, url, body } = request;

    console.log(
      `Conteúdo enviado pelo usuário: ${JSON.stringify(body, null, 2)}`,
    );

    return next.handle().pipe(
      tap(() => {
        console.log(
          `[Response] ${method} ${url} - Demorou ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
