import { Module } from '@nestjs/common';
import { SocketGatewayService } from './socket_gateway.service';


@Module({
  providers: [SocketGatewayService],
  exports: [SocketGatewayService]
})
export class SocketGatewayModule {}
