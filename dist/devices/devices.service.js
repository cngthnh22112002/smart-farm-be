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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const fan_schema_1 = require("./schema/fan.schema");
const waterpump_schema_1 = require("./schema/waterpump.schema");
const garden_schema_1 = require("../garden/schema/garden.schema");
const led_schema_1 = require("./schema/led.schema");
let DevicesService = class DevicesService {
    constructor(ledModel, fanModel, waterpumpModel, gardenModel) {
        this.ledModel = ledModel;
        this.fanModel = fanModel;
        this.waterpumpModel = waterpumpModel;
        this.gardenModel = gardenModel;
    }
    async getLed(device_id) {
        const led = await this.ledModel.findById(device_id.ledId);
        return led;
    }
    async getFan(device_id) {
        const fan = await this.fanModel.findById(device_id.fanId);
        return fan;
    }
    async getPump(device_id) {
        const pump = await this.waterpumpModel.findById(device_id.pumpId);
        return pump;
    }
    async createLed(user, garden_id) {
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(garden._id)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const led = await this.ledModel.create({ gardenId: gardenId });
        garden.leds.push(led._id);
        return led;
    }
    async createFan(user, garden_id) {
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(garden._id)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const fan = await this.fanModel.create({ gardenId: gardenId });
        garden.fans.push(fan._id);
        return fan;
    }
    async createPump(user, garden_id) {
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(garden._id)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        const pump = await this.waterpumpModel.create({ gardenId: gardenId });
        garden.water_pumps.push(pump._id);
        return pump;
    }
    async updateLed(user, updateLed) {
        const gardenId = updateLed.gardenId;
        const ledId = updateLed.ledId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        const ledIndex = garden.leds.findIndex((led) => (led.equals(ledId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        else if (ledIndex === -1) {
            throw new common_1.NotFoundException(`Led with ID ${ledId} not found for garden`);
        }
        const led = await this.ledModel.findByIdAndUpdate(ledId, updateLed, { new: true });
        if (!led) {
            throw new common_1.NotFoundException(`Led with ID ${ledId} not found`);
        }
        return led;
    }
    async updateFan(user, updateFan) {
        const gardenId = updateFan.gardenId;
        const fanId = updateFan.fanId;
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        const fanIndex = garden.fans.findIndex((fan) => (fan.equals(fanId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        else if (fanIndex === -1) {
            throw new common_1.NotFoundException(`Fan with ID ${fanId} not found for garden`);
        }
        const fan = await this.ledModel.findByIdAndUpdate(fanId, updateFan, { new: true });
        if (!fan) {
            throw new common_1.NotFoundException(`Fan with ID ${fanId} not found`);
        }
        return fan;
    }
    async updatePump(user, updatePump) {
        const gardenId = updatePump.gardenId;
        const pumpId = updatePump.pumpId;
        const garden = await this.gardenModel.findById(gardenId);
        const isValidGarden = mongoose.isValidObjectId(gardenId);
        const isValidLed = mongoose.isValidObjectId(pumpId);
        if (!isValidGarden || !isValidLed) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        const pumpIndex = garden.water_pumps.findIndex((pump) => (pump.equals(pumpId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        else if (pumpIndex === -1) {
            throw new common_1.NotFoundException(`Pump with ID ${pumpId} not found for garden`);
        }
        const pump = await this.waterpumpModel.findByIdAndUpdate(pumpId, updatePump, { new: true });
        if (!pump) {
            throw new common_1.NotFoundException(`Pump with ID ${pumpId} not found`);
        }
        return pump;
    }
    async deleteAllDeviceForAGarden(user, gardenId) {
        const garden = await this.gardenModel.findById(gardenId);
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        await this.ledModel.deleteMany({ gardenId: gardenId });
        await this.fanModel.deleteMany({ gardenId: gardenId });
        await this.waterpumpModel.deleteMany({ gardenId: gardenId });
        return garden;
    }
    async deleteAllDevice(user) {
        await this.ledModel.deleteMany({});
        await this.fanModel.deleteMany({});
        await this.waterpumpModel.deleteMany({});
        return user;
    }
};
DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(led_schema_1.Led.name)),
    __param(1, (0, mongoose_1.InjectModel)(fan_schema_1.Fan.name)),
    __param(2, (0, mongoose_1.InjectModel)(waterpump_schema_1.Waterpump.name)),
    __param(3, (0, mongoose_1.InjectModel)(garden_schema_1.Garden.name)),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model, mongoose.Model, mongoose.Model])
], DevicesService);
exports.DevicesService = DevicesService;
//# sourceMappingURL=devices.service.js.map