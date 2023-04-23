import { Controller, Delete, Request, Post, Param, UseGuards, Get, Body, Put } from '@nestjs/common';
import { GardenService } from './garden.service';
import { User } from 'src/user/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Garden } from './schema/garden.schema';
import { UpdateGardenDto } from './dto/update-garden.dto';
import { CreateGardenDto } from './dto/create-garden.dto';


@Controller('gardens')
export class GardenController {
    constructor(private readonly gardenService: GardenService) {}

    @UseGuards(AuthGuard())
    @Get(':id')
    async getOneGarden(@Request() req: any, @Param('id') gardenId: string): Promise<Garden> {
        return this.gardenService.getOneGarden(req.user, gardenId);
    } 

    @UseGuards(AuthGuard())
    @Get()
    async getAllGarden(@Request() req: any): Promise<Garden[]> {
        return this.gardenService.getAllGarden(req.user);
    } 

    @UseGuards(AuthGuard())
    @Post()
    async createBlankNewGarden(@Request() req: any): Promise<User> {
        return this.gardenService.createBlankGarden(req.user);
    } 

    @UseGuards(AuthGuard())
    @Post()
    async createNewGarden(@Request() req: any, @Body() newGarden: CreateGardenDto): Promise<User> {
        return this.gardenService.createNewGarden(req.user, newGarden);
    } 

    @UseGuards(AuthGuard())
    @Put()
    async updateGarden(@Request() req: any, @Body() updateGarden: UpdateGardenDto): Promise<Garden> {
        return this.gardenService.updateGarden(req.user, updateGarden);
    } 

    @UseGuards(AuthGuard())
    @Delete()
    async deleteAllGarden(@Request() req: any): Promise<User> {
        return this.gardenService.deleteAllGarden(req.user);
    } 

    @UseGuards(AuthGuard())
    @Delete(':id')
    async deleteOneGarden(@Request() req: any, @Param('id') gardenId: string): Promise<User> {
        return this.gardenService.deleteOneGarden(req.user, gardenId);
    } 
}
