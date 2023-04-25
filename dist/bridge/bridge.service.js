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
const devices_service_1 = require("../devices/devices.service");
const share_service_1 = require("../share/share.service");
const socket_gateway_service_1 = require("../socket_gateway/socket_gateway.service");
let BridgeService = class BridgeService {
    constructor(adafruitService, mqttService, shareService, deviceService, socketService) {
        this.adafruitService = adafruitService;
        this.mqttService = mqttService;
        this.shareService = shareService;
        this.deviceService = deviceService;
        this.socketService = socketService;
        this.mqttService.init();
    }
    async handleData(user, gardenId) {
        var client = this.mqttService.getClient();
        if (!client) {
            this.mqttService.init();
            client = this.mqttService.getClient();
        }
        await this.adafruitService.handleData(client, user, gardenId);
    }
    async connectDevice(user, allId) {
        this.shareService.setId(allId);
        const led = await this.deviceService.getLed({ ledId: allId.ledId });
        this.shareService.setLedStatus(led.status);
        const fan = await this.deviceService.getFan({ fanId: allId.fanId });
        this.shareService.setFanStatus(fan.status);
        const pump = await this.deviceService.getPump({ pumpId: allId.pumpId });
        this.shareService.setPumpStatus(pump.status);
        this.socketService.server.emit('led', led.status);
        this.socketService.server.emit('fan', fan.status);
        this.socketService.server.emit('pump', pump.status);
    }
    connect(user) {
        this.mqttService.init();
    }
    disconnect(user) {
        const client = this.mqttService.getClient();
        this.adafruitService.disconnect(client);
        this.mqttService.setClient(undefined);
    }
};
BridgeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [adafruit_service_1.AdafruitService,
        adafruit_config_1.MqttService,
        share_service_1.ShareService,
        devices_service_1.DevicesService,
        socket_gateway_service_1.SocketGatewayService])
], BridgeService);
exports.BridgeService = BridgeService;
//# sourceMappingURL=bridge.service.js.map