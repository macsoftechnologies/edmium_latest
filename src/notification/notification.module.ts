import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedService } from 'src/shared/shared.service';
import { UserSchema } from 'src/user/dto/user.schema';
import { NotificationSchema } from './dto/notification.schema';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports:[ 
    MongooseModule.forFeature([
    {name :'Notifications' , schema: NotificationSchema},
    { name: 'User', schema: UserSchema },
    ]) ,
    HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 50000,
      maxRedirects: 5
    })
  })],
  controllers: [NotificationController],
  providers: [NotificationService ,SharedService]
})
export class NotificationModule {}
