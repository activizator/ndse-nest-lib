import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GExceptionFilter } from './filters/gexeption.filter';
import { ErrorsInterceptor } from './interceptors/errors';
import { ExeptionsInterceptor } from './interceptors/exeptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GExceptionFilter());
  // app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new ExeptionsInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
