import { CallHandler, ExecutionContext, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class LoggerInterceptor implements NestInterceptor {

  logger = new Logger(LoggerInterceptor.name);
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => console.log(`After...${Date.now() - now}ms`))
      );
  }


}