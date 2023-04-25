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
exports.BridgeController = void 0;
const common_1 = require("@nestjs/common");
const bridge_service_1 = require("./bridge.service");
const passport_1 = require("@nestjs/passport");
const gardenId_dto_1 = require("../garden/dto/gardenId.dto");
const allId_dto_1 = require("../share/dto/allId.dto");
let BridgeController = class BridgeController {
    constructor(bridgeService) {
        this.bridgeService = bridgeService;
    }
    async handleData(req, gardenId) {
        await this.bridgeService.handleData(req.user, gardenId);
    }
    async connect(req) {
        this.bridgeService.connect(req.user);
    }
    async disconnect(req) {
        this.bridgeService.disconnect(req.user);
    }
    async connectDevices(req, allId) {
        await this.bridgeService.connectDevice(req.user, allId);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('data'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gardenId_dto_1.GardenIdDto]),
    __metadata("design:returntype", Promise)
], BridgeController.prototype, "handleData", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('connect'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BridgeController.prototype, "connect", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('disconnect'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BridgeController.prototype, "disconnect", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, allId_dto_1.AllIdDto]),
    __metadata("design:returntype", Promise)
], BridgeController.prototype, "connectDevices", null);
BridgeController = __decorate([
    (0, common_1.Controller)('bridge'),
    __metadata("design:paramtypes", [bridge_service_1.BridgeService])
], BridgeController);
exports.BridgeController = BridgeController;
//# sourceMappingURL=bridge.controller.js.map