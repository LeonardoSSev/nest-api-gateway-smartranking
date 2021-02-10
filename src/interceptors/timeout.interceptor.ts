import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, timeout } from "rxjs/operators";

export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const limit = process.env.APP_TIMEOUT_MS ? parseInt(process.env.APP_TIMEOUT_MS) : 10000;

    return next
      .handle()
      .pipe(timeout(limit));
  }
}