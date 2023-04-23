"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenService = void 0;
const common_1 = require("@nestjs/common");
const garden_schema_1 = require("./schema/garden.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const devices_service_1 = require("../devices/devices.service");
let GardenService = class GardenService {
    constructor(deviceService, gardenModel) {
        this.deviceService = deviceService;
        this.gardenModel = gardenModel;
    }
    async createBlankGarden(user) {
        const newGarden = await this.gardenModel.create({ userId: user._id });
        user.gardens.push(newGarden._id);
        newGarden.save();
        return user.save();
    }
    async createNewGarden(user, createGarden) {
        const newGarden = await this.gardenModel.create({ userId: user._id });
        user.gardens.push(newGarden._id);
        if (createGarden.hasOwnProperty('nums_led')) {
            for (var i = 0; i < createGarden.nums_led; i++) {
                var led = await this.deviceService.createLed(user, newGarden._id);
                newGarden.leds.push(led._id);
            }
        }
        if (createGarden.hasOwnProperty('nums_fan')) {
            for (var i = 0; i < createGarden.nums_fan; i++) {
                var fan = await this.deviceService.createFan(user, newGarden._id);
                newGarden.fans.push(fan._id);
            }
        }
        if (createGarden.hasOwnProperty('nums_pump')) {
            for (var i = 0; i < createGarden.nums_pump; i++) {
                var pump = await this.deviceService.createPump(user, newGarden._id);
                newGarden.water_pumps.push(pump._id);
            }
        }
        newGarden.save();
        return user.save();
    }
    async updateGarden(user, updateGarden) {
        const gardenId = updateGarden.gardenId;
        const isValidId = mongoose.isValidObjectId(gardenId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const garden = await this.gardenModel.findByIdAndUpdate(gardenId, updateGarden, { new: true }).exec();
        return garden.save();
    }
    async getOneGarden(user, gardenId) {
        const isValidId = mongoose.isValidObjectId(gardenId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const garden = await this.gardenModel.findById(gardenId).exec();
        return garden;
    }
    async getAllGarden(user) {
        const allGarden = await this.gardenModel.find({ userId: user._id }).exec();
        return allGarden;
    }
    async deleteAllGarden(user) {
        user.gardens.splice(0, user.gardens.length);
        await this.gardenModel.deleteMany({ userId: user._id });
        return user.save();
    }
    async deleteOneGarden(user, gardenId) {
        const isValidId = mongoose.isValidObjectId(gardenId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const deleteGarden = await this.gardenModel.findOneAndDelete({ _id: gardenId });
        if (!deleteGarden) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(deleteGarden._id)));
        user.gardens.splice(gardenIndex, 1);
        return user.save();
    }
};
GardenService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(garden_schema_1.Garden.name)),
    __metadata("design:paramtypes", [devices_service_1.DevicesService, mongoose.Model])
], GardenService);
exports.GardenService = GardenService;
//# sourceMappingURL=garden.service.js.map