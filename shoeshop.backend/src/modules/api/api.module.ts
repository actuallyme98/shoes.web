import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  HttpModule,
  HttpService,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CONTROLLERS } from '@api/controlers';
import { SERVICES, EXPORT_SERVICES } from '@api/services';
import { ENTITIES } from './entities';
import { AuthMiddleware } from '@api/middlewares';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    // to allow this module can used the infrastructure service
    ConfigModule,
    TypeOrmModule.forFeature(ENTITIES),
    HttpModule,
    SharedModule,
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
  exports: [...EXPORT_SERVICES],
})
export class ApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'api/users', method: RequestMethod.ALL });
  }
}
