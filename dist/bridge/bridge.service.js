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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeService = void 0;
const common_1 = require("@nestjs/common");
const adafruit_service_1 = require("../adafruit/adafruit.service");
const adafruit_config_1 = require("../adafruit/adafruit_config");
let BridgeService = class BridgeService {
    constructor(adafruitService, mqttService) {
        this.adafruitService = adafruitService;
        this.mqttService = mqttService;
        this.mqttService.init();
    }
    handleData(user, gardenId) {
        const client = this.mqttService.getClient();
        this.adafruitService.handleData(client, user, gardenId);
    }
};
BridgeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [adafruit_service_1.AdafruitService,
        adafruit_config_1.MqttService])
], BridgeService);
exports.BridgeService = BridgeService;
//# sourceMappingURL=bridge.service.js.map