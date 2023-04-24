import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
import { Fan } from './schema/fan.schema';
import { Waterpump } from './schema/waterpump.schema';
import { Garden } from 'src/garden/schema/garden.schema';
import { UpdateLedrDto } from './dto/update-led.dto';
import { UpdateFanrDto } from './dto/update-fan.dto';
import { UpdatePumprDto } from './dto/update-pump.dto';
import { Led } from './schema/led.schema';
import { Types } from 'mongoose';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Led.name)
    private ledModel: mongoose.Model<Led>,

    @InjectModel(Fan.name)
    private fanModel: mongoose.Model<Fan>,

    @InjectModel(Waterpump.name)
    private waterpumpModel: mongoose.Model<Waterpump>,

    @InjectModel(Garden.name)
    private gardenModel: mongoose.Model<Garden>,
) {}    

    async createLed (user: User, garden_id: GardenIdDto): Promise<Led> {
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(garden._id)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }

        const led = await this.ledModel.create({gardenId: gardenId});
        garden.leds.push(led._id);
        return led;
    }

    async createFan (user: User, garden_id: GardenIdDto): Promise<Fan> {
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(garden._id)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }

        const fan = await this.fanModel.create({gardenId: gardenId});
        garden.fans.push(fan._id);
        return fan;
    }

    async createPump (user: User, garden_id: GardenIdDto): Promise<Waterpump> {
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(garden._id)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }

        const pump = await this.waterpumpModel.create({gardenId: gardenId});
        garden.water_pumps.push(pump._id);
        return pump;
    }

    async updateLed (user: User, updateLed: UpdateLedrDto): Promise<Led> {
        const gardenId = updateLed.gardenId;
        const ledId = updateLed.ledId;

        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        const ledIndex = garden.leds.findIndex((led) => (led.equals(ledId)));

        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        } else if (ledIndex === -1) {
          throw new NotFoundException(`Led with ID ${ledId} not found for garden`);
        }

        const led = await this.ledModel.findByIdAndUpdate(ledId, updateLed, {new: true});
        if(!led) {
          throw new NotFoundException(`Led with ID ${ledId} not found`);
        }
        return led;
    }

    async updateFan (user: User, updateFan: UpdateFanrDto): Promise<Fan> {
        const gardenId = updateFan.gardenId;
        const fanId = updateFan.fanId;

        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        const fanIndex = garden.fans.findIndex((fan) => (fan.equals(fanId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        } else if (fanIndex === -1) {
          throw new NotFoundException(`Fan with ID ${fanId} not found for garden`);
        }

        const fan = await this.ledModel.findByIdAndUpdate(fanId, updateFan, {new: true});
        if(!fan) {
          throw new NotFoundException(`Fan with ID ${fanId} not found`);
        }
        return fan;
    }

    async updatePump (user: User, updatePump: UpdatePumprDto): Promise<Waterpump> {
        const gardenId = updatePump.gardenId;
        const pumpId = updatePump.pumpId;
        const garden = await this.gardenModel.findById(gardenId);

        const isValidGarden = mongoose.isValidObjectId(gardenId);
        const isValidLed = mongoose.isValidObjectId(pumpId);
        if (!isValidGarden || !isValidLed) {
          throw new BadRequestException('Please enter correct id.');
        }
  
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        const pumpIndex = garden.water_pumps.findIndex((pump) => (pump.equals(pumpId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        } else if (pumpIndex === -1) {
          throw new NotFoundException(`Pump with ID ${pumpId} not found for garden`);
        }

        const pump = await this.waterpumpModel.findByIdAndUpdate(pumpId, updatePump, {new: true});
        if(!pump) {
          throw new NotFoundException(`Pump with ID ${pumpId} not found`);
        }
        return pump;
    }

    async deleteAllDeviceForAGarden(user: User, gardenId: mongoose.Types.ObjectId): Promise<Garden> {
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }

        await this.ledModel.deleteMany({gardenId: gardenId});
        await this.fanModel.deleteMany({gardenId: gardenId});
        await this.waterpumpModel.deleteMany({gardenId: gardenId});
    
        return garden;
    }

    async deleteAllDevice(user: User): Promise<User> {
      await this.ledModel.deleteMany({});
      await this.fanModel.deleteMany({});
      await this.waterpumpModel.deleteMany({});
      return user;
    }
}
