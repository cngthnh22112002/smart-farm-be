import { Body, Controller, Delete, Get, Post, Put, Param, Request, UseGuards } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { Dictionary } from './schema/dictionary.schema';
import { CreateNewDictionaryDto } from './dto/create-dictionary.dto';
import { DeleteDictionaryDto } from './dto/delete-dictionary.dto';
import { User } from 'src/user/schema/user.schema';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('dictionaries')
export class DictionaryController {
    constructor(private readonly dictionaryService: DictionaryService) {}

    @UseGuards(AuthGuard())
    @Get()
    async getAllDictionary(@Request() req:any): Promise<Dictionary[]> {
        return this.dictionaryService.getAllDictionary(req.user);
    } 

    @UseGuards(AuthGuard())
    @Get(':id')
    async getOneDictionary(@Request() req:any, @Param('id') dictionaryId: string): Promise<Dictionary> {
        return this.dictionaryService.getOneDictionary(req.user, dictionaryId);
    } 

    @UseGuards(AuthGuard())
    @Post()
    async createNewDictionary(@Request() req:any, @Body() createNewDictionary: CreateNewDictionaryDto): Promise<Dictionary> {
        return this.dictionaryService.createDictionary(req.user, createNewDictionary);
    } 

    @UseGuards(AuthGuard())
    @Delete(':id')
    async deleteOneDictionary(@Request() req:any, @Param('id') dictionaryId: string): Promise<User> {
        return this.dictionaryService.deleteOneDictionary(req.user, dictionaryId);
    } 

    @UseGuards(AuthGuard())
    @Put()
    async updateDictionary(@Request() req:any, @Body() updateDictionary: UpdateDictionaryDto): Promise<Dictionary> {
        return this.dictionaryService.updateDictionary(req.user, updateDictionary);
    } 
}
