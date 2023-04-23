import { Dictionary } from './schema/dictionary.schema';
import mongoose from 'mongoose';
import { CreateNewDictionaryDto } from './dto/create-dictionary.dto';
import { User } from 'src/user/schema/user.schema';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
export declare class DictionaryService {
    private dictionaryModel;
    constructor(dictionaryModel: mongoose.Model<Dictionary>);
    createDictionary(user: User, createNewDictionary: CreateNewDictionaryDto): Promise<Dictionary>;
    getOneDictionary(user: User, dictionaryId: string): Promise<Dictionary>;
    getAllDictionary(user: User): Promise<Dictionary[]>;
    deleteAllDictionary(user: User): Promise<User>;
    deleteOneDictionary(user: User, dictionaryId: string): Promise<User>;
    updateDictionary(user: User, updateDictionary: UpdateDictionaryDto): Promise<Dictionary>;
}
