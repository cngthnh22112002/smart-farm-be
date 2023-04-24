import { Module } from '@nestjs/common';
import { GardenService } from './garden.service';
import { GardenController } from './garden.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Garden, GardenSchema } from './schema/garden.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [
    DevicesModule,
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Garden.name, schema: GardenSchema }])
  ],
  providers: [GardenService],
  controllers: [GardenController],
  exports: [GardenService]
})
export class GardenModule {}
