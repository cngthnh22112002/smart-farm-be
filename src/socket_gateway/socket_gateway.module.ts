import { Module } from '@nestjs/common';
import { SocketGatewayService } from './socket_gateway.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    AuthModule,
  ],
  providers: [SocketGatewayService],
  exports: [SocketGatewayService]
})
export class SocketGatewayModule {}
