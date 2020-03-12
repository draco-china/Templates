import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Helmet from 'helmet';
import * as Compression from 'compression';
import * as BodyParser from 'body-parser';
import { AppModule } from '@/app/app.module';
import { APP } from '@/app/app.config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { ErrorsInterceptor } from '@/common/interceptors/exception.interceptor.ts';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
// import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 构建 swagger
  const options = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app
    .use(Helmet())
    .use(Compression())
    .use(BodyParser.json({ limit: '1mb' }))
    .use(BodyParser.urlencoded({ extended: true }))
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(
      new ErrorsInterceptor(),
      new LoggingInterceptor(),
      new TimeoutInterceptor(),
      // new TransformInterceptor()
    )
    .listen(APP.PORT, () => {
      console.info(`Server is running at http://localhost:${APP.PORT}, env:${APP.ENVIRONMENT}`);
      console.info('Press CTRL-C to stop \n');
    });
}
bootstrap();
