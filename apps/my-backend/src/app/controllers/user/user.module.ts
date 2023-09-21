import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserAuthMiddleware } from '../../middlewares/user-auth.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserAuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}
