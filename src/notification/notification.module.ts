import { HttpModule, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports:[ HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 50000,
      maxRedirects: 5
    })
  })],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
