import { DictionaryService } from './dictionary.service';
import { Dictionary } from './schema/dictionary.schema';
import { CreateNewDictionaryDto } from './dto/create-dictionary.dto';
import { User } from 'src/user/schema/user.schema';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
export declare class DictionaryController {
    private readonly dictionaryService;
    constructor(dictionaryService: DictionaryService);
    getAllDictionary(req: any): Promise<Dictionary[]>;
    getOneDictionary(req: any, dictionaryId: string): Promise<Dictionary>;
    createNewDictionary(req: any, createNewDictionary: CreateNewDictionaryDto): Promise<Dictionary>;
    deleteOneDictionary(req: any, dictionaryId: string): Promise<User>;
    updateDictionary(req: any, updateDictionary: UpdateDictionaryDto): Promise<Dictionary>;
}
