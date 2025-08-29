import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { UserService } from './user-api.service';
import { UserResolver } from './user-resolver';

@Module({
  providers: [
    //  UserController,
    UserService,
    UserResolver,
  ],
  // controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
