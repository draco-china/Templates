import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const content = request.method + ' -> ' + request.url;
    console.log(`+ Before...`, content);

    const now = Date.now();
    return call$.pipe(tap(() => console.log(`- After...`, content, response.statusCode, `${Date.now() - now}ms`)));
  }
}