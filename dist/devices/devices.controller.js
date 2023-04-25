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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const passport_1 = require("@nestjs/passport");
const gardenId_dto_1 = require("../garden/dto/gardenId.dto");
const ledId_dto_1 = require("./dto/ledId.dto");
const fanId_dto_1 = require("./dto/fanId.dto");
const pumpId_dto_1 = require("./dto/pumpId.dto");
let DevicesController = class DevicesController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    async createLed(req, gardenId) {
        return this.deviceService.createLed(req.user, gardenId);
    }
    async createFan(req, gardenId) {
        return this.deviceService.createFan(req.user, gardenId);
    }
    async createPump(req, gardenId) {
        return this.deviceService.createPump(req.user, gardenId);
    }
    async getLed(req, deviceId) {
        return this.deviceService.getLed(deviceId);
    }
    async getFan(req, deviceId) {
        return this.deviceService.getFan(deviceId);
    }
    async getPump(req, deviceId) {
        return this.deviceService.getPump(deviceId);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('led'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gardenId_dto_1.GardenIdDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "createLed", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('fan'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gardenId_dto_1.GardenIdDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "createFan", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('pump'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gardenId_dto_1.GardenIdDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "createPump", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('led'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ledId_dto_1.LedIdDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getLed", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('fan'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, fanId_dto_1.FanIdDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getFan", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('pump'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pumpId_dto_1.PumpIdDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "getPump", null);
DevicesController = __decorate([
    (0, common_1.Controller)('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DevicesController);
exports.DevicesController = DevicesController;
//# sourceMappingURL=devices.controller.js.map