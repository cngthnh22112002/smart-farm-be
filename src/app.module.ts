import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseConnectiton } from './mongoose/mongoose.module';
import { AuthModule } from './auth/auth.module';
import { BridgeModule } from './bridge/bridge.module';
<<<<<<< Updated upstream
=======
import { MiddlewareConsumer } from '@nestjs/common';
import { GardenModule } from './garden/garden.module';
import { NotificationModule } from './notification/notification.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { SensorsModule } from './sensors/sensors.module';
import { DevicesService } from './devices/devices.service';
import { DevicesModule } from './devices/devices.module';
import * as cors from 'cors';
>>>>>>> Stashed changes


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    AuthModule,
<<<<<<< Updated upstream
    BridgeModule
=======
    MongooseConnectiton,
    UserModule,
    BridgeModule,
    SensorsModule,
    GardenModule,
    NotificationModule,
    DictionaryModule,
    DevicesModule,
>>>>>>> Stashed changes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
