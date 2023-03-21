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
exports.TemperatureService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const temperature_schema_1 = require("./schema/temperature.schema");
const user_schema_1 = require("../user/schema/user.schema");
const mongoose = require("mongoose");
let TemperatureService = class TemperatureService {
    constructor(temperatureModel, userModel) {
        this.temperatureModel = temperatureModel;
        this.userModel = userModel;
    }
    async findAll() {
        const temperatures = await this.temperatureModel.find();
        return temperatures;
    }
    async createTemperature(temperature, user) {
        const data = Object.assign(temperature, { user: user._id });
        const res = await this.temperatureModel.findOne({ user: temperature.user });
        if (res) {
            res.temperature.push(temperature.temperature[0]);
            await res.save();
            return res;
        }
        const newTemp = await this.temperatureModel.create(data);
        return newTemp;
    }
};
TemperatureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(temperature_schema_1.Temperature.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose.Model, mongoose.Model])
], TemperatureService);
exports.TemperatureService = TemperatureService;
//# sourceMappingURL=temperature.service.js.map