import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BridgeModule } from './bridge/bridge.module';
import { MongooseConnectiton } from './mongoose/mongoose.module';
import { UserModule } from './user/user.module';
import { SensorsModule } from './sensors/sensors.module';
import { GardenModule } from './garden/garden.module';
import { NotificationModule } from './notification/notification.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { DevicesModule } from './devices/devices.module';
import { ShareModule } from './share/share.module';
import { ReportService } from './report/report.service';
import { ReportModule } from './report/report.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    AuthModule,
    MongooseConnectiton,
    UserModule,
    BridgeModule,
    SensorsModule,
    GardenModule,
    NotificationModule,
    DictionaryModule,
    DevicesModule,
    ShareModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService, ReportService],
})
export class AppModule {}
