require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggerInterceptor, new TimeoutInterceptor);
  app.useGlobalFilters(new AllExceptionsFilter());

  defineTimezone();

  await app.listen(process.env.APP_PORT);
}

function defineTimezone() {
  return Date.prototype.toJSON = function(): any {
    return momentTimezone(this)
      .tz(process.env.APP_DATE_TIMEZONE)
      .format(process.env.APP_DATE_FORMAT);
  }
}


bootstrap();
