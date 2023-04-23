import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Garden } from './schema/garden.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import * as mongoose from 'mongoose';
import { UpdateGardenDto } from './dto/update-garden.dto';
import { CreateGardenDto } from './dto/create-garden.dto';
import { DevicesService } from 'src/devices/devices.service';


@Injectable()
export class GardenService {
    constructor(
        private deviceService: DevicesService,

        @InjectModel(Garden.name)
        private gardenModel: mongoose.Model<Garden>,
    ) {}


    async createBlankGarden(user: User): Promise<User> {
      const newGarden = await this.gardenModel.create({userId: user._id});
      user.gardens.push(newGarden._id);
      newGarden.save();
      return user.save();
    }

    async createNewGarden(user: User, createGarden: CreateGardenDto): Promise<User> {
      const newGarden = await this.gardenModel.create({userId: user._id});
      user.gardens.push(newGarden._id);

      if(createGarden.hasOwnProperty('nums_led')) {
        for(var i = 0; i < createGarden.nums_led; i++) {
          var led = await this.deviceService.createLed(user, newGarden._id);
          newGarden.leds.push(led._id);
        }
      }

      if(createGarden.hasOwnProperty('nums_fan')) {
        for(var i = 0; i < createGarden.nums_fan; i++) {
          var fan = await this.deviceService.createFan(user, newGarden._id);
          newGarden.fans.push(fan._id);
        }
      }

      if(createGarden.hasOwnProperty('nums_pump')) {
        for(var i = 0; i < createGarden.nums_pump; i++) {
          var pump = await this.deviceService.createPump(user, newGarden._id);
          newGarden.water_pumps.push(pump._id);
        }
      }
      newGarden.save();
      return user.save();
    }

    async updateGarden(user: User, updateGarden: UpdateGardenDto): Promise<Garden> {
      const gardenId = updateGarden.gardenId;
      const isValidId = mongoose.isValidObjectId(gardenId);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }

      const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
      if(gardenIndex === -1) {
        throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
      }   
      const garden = await this.gardenModel.findByIdAndUpdate(gardenId, updateGarden, {new: true}).exec();
      return garden.save();
    }

    async getOneGarden(user: User, gardenId: string): Promise<Garden> {
      const isValidId = mongoose.isValidObjectId(gardenId);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }

      const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
      if(gardenIndex === -1) {
        throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
      }   
      const garden = await this.gardenModel.findById(gardenId).exec();
      return garden;
    }

    async getAllGarden(user: User): Promise<Garden[]> {
      const allGarden = await this.gardenModel.find({userId: user._id}).exec();
      return allGarden;
    }


    async deleteAllGarden(user: User): Promise<User> {
      // Remove the garden with the given ID from the user's gardens array
      user.gardens.splice(0, user.gardens.length);
      //// Remove the garden document from the gardenModel collection in the database
      await this.gardenModel.deleteMany({userId: user._id})

      // Save the updated user object to the database and return it
      return user.save();
    }

    async deleteOneGarden(user: User, gardenId: string): Promise<User> {
      const isValidId = mongoose.isValidObjectId(gardenId);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }
      
      // Remove the garden document from the gardenModel collection in the database
      const deleteGarden = await this.gardenModel.findOneAndDelete({_id: gardenId});
      
      if(!deleteGarden) {
        throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
      }

      // Find the index of the garden with the given ID in the user's gardens array
      const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(deleteGarden._id)));    
    
      // Remove the garden with the given ID from the user's gardens array
      user.gardens.splice(gardenIndex, 1);

      // Save the updated user object to the database and return it
      return user.save();
    }
}
