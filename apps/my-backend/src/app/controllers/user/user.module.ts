import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
