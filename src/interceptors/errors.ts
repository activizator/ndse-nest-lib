import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  InternalServerErrorException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(
          new InternalServerErrorException({
            status: 'fail',
            data: err.message,
          }),
        );
      }),
    );
  }
}
