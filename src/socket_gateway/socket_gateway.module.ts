import { Module } from '@nestjs/common';
import { SocketGatewayService } from './socket_gateway.service';
import { AuthModule } from 'src/auth/auth.module';
import { MqttService } from 'src/adafruit/adafruit_config';



@Module({
  imports: [
    AuthModule,
  ],
  providers: [SocketGatewayService, MqttService],
  exports: [SocketGatewayService]
})
export class SocketGatewayModule {}
