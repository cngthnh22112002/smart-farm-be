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
exports.SensorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const temperature_schema_1 = require("./schema/temperature.schema");
const light_schema_1 = require("./schema/light.schema");
const humidity_schema_1 = require("./schema/humidity.schema");
const soilmoisture_schema_1 = require("./schema/soilmoisture.schema");
const garden_service_1 = require("../garden/garden.service");
let SensorsService = class SensorsService {
    constructor(gardenService, humidityModel, lightModel, soilmoistureModel, temperatureModel) {
        this.gardenService = gardenService;
        this.humidityModel = humidityModel;
        this.lightModel = lightModel;
        this.soilmoistureModel = soilmoistureModel;
        this.temperatureModel = temperatureModel;
    }
    async createHumi(user, createHumi) {
        const gardenId = createHumi.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const humi = await this.humidityModel.create(createHumi);
        return humi.save();
    }
    async createLight(user, createLight) {
        const gardenId = createLight.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const light = await this.lightModel.create(createLight);
        return light.save();
    }
    async createSm(user, createSm) {
        const gardenId = createSm.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const sm = await this.soilmoistureModel.create(createSm);
        return sm.save();
    }
    async createTemp(user, createTemp) {
        const gardenId = createTemp.gardenId;
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const temp = await this.temperatureModel.create(createTemp);
        return temp.save();
    }
    async getTodayReport(user, report) {
        const garden = this.gardenService.getOneGarden(user, { gardenId: report.gardenId });
        const type = report.type;
        let model;
        if (type === 'temperature') {
            model = this.temperatureModel;
        }
        else if (type === 'humidity') {
            model = this.humidityModel;
        }
        else if (type === 'soilmoisture') {
            model = this.soilmoistureModel;
        }
        else if (type === 'light') {
            model = this.lightModel;
        }
        else {
            throw new Error('Invalid type parameter');
        }
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        const todayReport = await model.aggregate([
            {
                $match: {
                    gardenId: (await garden)._id,
                    createdAt: { $gte: startOfToday, $lte: endOfToday },
                },
            },
            {
                $lookup: {
                    from: 'gardens',
                    localField: 'gardenId',
                    foreignField: '_id',
                    as: 'garden',
                },
            },
            {
                $project: {
                    _id: 0,
                    value: 1,
                    createdAt: 1,
                },
            },
        ]);
        return todayReport;
    }
};
SensorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(humidity_schema_1.Humidity.name)),
    __param(2, (0, mongoose_1.InjectModel)(light_schema_1.Light.name)),
    __param(3, (0, mongoose_1.InjectModel)(soilmoisture_schema_1.Soilmoisture.name)),
    __param(4, (0, mongoose_1.InjectModel)(temperature_schema_1.Temperature.name)),
    __metadata("design:paramtypes", [garden_service_1.GardenService, mongoose.Model, mongoose.Model, mongoose.Model, mongoose.Model])
], SensorsService);
exports.SensorsService = SensorsService;
//# sourceMappingURL=sensors.service.js.map