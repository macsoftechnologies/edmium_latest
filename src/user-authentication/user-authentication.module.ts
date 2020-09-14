import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthenticationSchema } from './dto/user-authentication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserAuthentication', schema: UserAuthenticationSchema },
    ]),
  ],
})
export class UserAuthenticationModule {}
