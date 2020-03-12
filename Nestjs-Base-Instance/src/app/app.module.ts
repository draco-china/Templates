import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '@/app/app.controller';
import { CorsMiddleware } from '@/common/middlewares/cors.middleware';
import { AuthModule } from '@/auth/auth.module';
/**
 * @Description: app 主模块
 * @Module: app
 * @Author: Daker
 * @Email: daker.zhou@gmail.com
 * @Github: https://github.com/daker-china
 * @Date: 2018-12-28 11:46:34
 * @LastEditTime: 2018-12-29 18:25:10
 */


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', { useNewUrlParser: true }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}