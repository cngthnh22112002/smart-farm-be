import { Module } from '@nestjs/common';
import { SocketGatewayService } from './socket_gateway.service';
import { AuthModule } from 'src/auth/auth.module';
import { MqttService } from 'src/adafruit/adafruit_config';
import { ShareService } from 'src/share/share.service';



@Module({
  imports: [
    AuthModule,
  ],
  providers: [SocketGatewayService, MqttService, ShareService],
  exports: [SocketGatewayService]
})
export class SocketGatewayModule {}
