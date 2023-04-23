import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary } from './schema/dictionary.schema';
import mongoose from 'mongoose';
import { CreateNewDictionaryDto } from './dto/create-dictionary.dto';
import { User } from 'src/user/schema/user.schema';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';

@Injectable()
export class DictionaryService {
    constructor(
        @InjectModel(Dictionary.name)
        private dictionaryModel: mongoose.Model<Dictionary>,

    ) {}

    async createDictionary(user: User, createNewDictionary: CreateNewDictionaryDto): Promise<Dictionary> {
        const newDictionary = await this.dictionaryModel.create({
          ...createNewDictionary,
          userId: user._id
        });
        user.dictionaries.push(newDictionary._id);
        user.save();
        return newDictionary;
    }

    async getOneDictionary(user: User, dictionaryId: string): Promise<Dictionary> {
      const isValidId = mongoose.isValidObjectId(dictionaryId);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }

      const dictionaryIndex = user.dictionaries.findIndex((dictionary) => (dictionary.equals(dictionaryId)));
      if(dictionaryIndex === -1) {
        throw new NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
      }   
      const dictionary = await this.dictionaryModel.findById(dictionaryId).exec();
      return dictionary;
    }

    async getAllDictionary(user: User): Promise<Dictionary[]> {
      if (!user.dictionaries) {
        throw new NotFoundException(`Dictionary with ID ${user._id} not found`);
      }
      const allDictionary = await this.dictionaryModel.find({userId: user._id}).exec();
      return allDictionary;
    }

    async deleteAllDictionary(user: User): Promise<User> {
      // Remove the dictionary with the given ID from the user's dictionaries array
      user.dictionaries.splice(0, user.dictionaries.length);
      //// Remove the dictionary document from the dictionaryModel collection in the database
      await this.dictionaryModel.deleteMany({userId: user._id})

      // Save the updated user object to the database and return it
      return user.save();
    }

    async deleteOneDictionary(user: User, dictionaryId: string): Promise<User> {
      const isValidId = mongoose.isValidObjectId(dictionaryId);
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }
      
      // Remove the dictionary document from the dictionaryModel collection in the database
      const deleteDictionary = await this.dictionaryModel.findOneAndDelete({_id: dictionaryId});
      
      if(!deleteDictionary) {
        throw new NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
      }

      // Find the index of the dictionary with the given ID in the user's dictionaries array
      const dictionaryIndex = user.dictionaries.findIndex((dictionary) => (dictionary.equals(deleteDictionary._id)));  
      if(dictionaryIndex === -1) {
          throw new NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
      }  
    
      // Remove the dictionary with the given ID from the user's dictionaries array
      user.dictionaries.splice(dictionaryIndex, 1);

      // Save the updated user object to the database and return it
      return user.save();
    }

    async updateDictionary(user: User, updateDictionary: UpdateDictionaryDto): Promise<Dictionary> {
        const { dictionaryId, ...updatedDictionary } = updateDictionary; 
        // Find dictionary
        const dictionaryIndex = user.dictionaries.findIndex((dictionary) => (dictionary.equals(dictionaryId)));
        if(dictionaryIndex === -1) {
            throw new NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
        }

        const newDictionary = await this.dictionaryModel.findByIdAndUpdate(dictionaryId ,updatedDictionary, {new: true});
        if(!newDictionary) {
            throw new NotFoundException(`Dictionary with ID ${dictionaryId} not found`);
        }
        newDictionary.save();
        return newDictionary;
    }
}
