import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TemperatureModule } from './temperature/temperature.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { AuthModule } from './auth/auth.module';
import { BridgeModule } from './bridge/bridge.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule,
    TemperatureModule,
    UserModule,
    AuthModule,
    BridgeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
