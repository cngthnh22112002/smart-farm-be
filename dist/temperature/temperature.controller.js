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
exports.TemperatureController = void 0;
const common_1 = require("@nestjs/common");
const temperature_service_1 = require("./temperature.service");
const create_temperature_dto_1 = require("./dto/create-temperature.dto");
const common_2 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let TemperatureController = class TemperatureController {
    constructor(temperatureService) {
        this.temperatureService = temperatureService;
    }
    async getAllTemperatures() {
        return this.temperatureService.findAll();
    }
    async createTemperature(temperature, req) {
        console.log(req.user);
        const createTemp = await this.temperatureService.createTemperature(temperature, req.user);
        if (!createTemp) {
            throw new common_2.NotFoundException(`Record not found`);
        }
        return createTemp;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemperatureController.prototype, "getAllTemperatures", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_temperature_dto_1.CreateTemperatureDto, Object]),
    __metadata("design:returntype", Promise)
], TemperatureController.prototype, "createTemperature", null);
TemperatureController = __decorate([
    (0, common_1.Controller)('temperature'),
    __metadata("design:paramtypes", [temperature_service_1.TemperatureService])
], TemperatureController);
exports.TemperatureController = TemperatureController;
//# sourceMappingURL=temperature.controller.js.map