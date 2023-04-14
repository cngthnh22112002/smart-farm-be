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
let BridgeController = class BridgeController {
    constructor(bridgeService) {
        this.bridgeService = bridgeService;
    }
    connect() {
        this.bridgeService.connect();
    }
    subcribe(topic) {
        this.bridgeService.subcribe(topic);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BridgeController.prototype, "connect", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    __param(0, (0, common_1.Body)('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BridgeController.prototype, "subcribe", null);
BridgeController = __decorate([
    (0, common_1.Controller)('bridge'),
    __metadata("design:paramtypes", [bridge_service_1.BridgeService])
], BridgeController);
exports.BridgeController = BridgeController;
//# sourceMappingURL=bridge.controller.js.map