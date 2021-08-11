import 'dotenv/config';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { flatten } from 'lodash';
import { AppModule } from './app.module';
import { ApiExecptionFilter } from './common/filters/api-execption.filter';
import { ApiTransformInterceptor } from './common/interceptors/api-transform.interceptor';
import { isDev } from './config/configuration';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  // validate
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: true,
      skipUndefinedProperties: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          flatten(
            errors
              .filter((item) => !!item.constraints)
              .map((item) => Object.values(item.constraints)),
          ).join('; '),
        );
      },
    }),
  );
  // execption
  app.useGlobalFilters(new ApiExecptionFilter());
  // api interceptor
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));

  const port = configService.get<number>('port');

  if (isDev()) {
    // swagger
    await setupSwagger(app);
    Logger.log(`Swagger is at http://localhost:${port}/doc/api-swagger`);
    Logger.log(`Redoc is at http://localhost:${port}/doc/api-redoc`);
  }

  await app.listen(port, '0.0.0.0');

  // log
  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
