"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeModule = void 0;
const common_1 = require("@nestjs/common");
const bridge_service_1 = require("./bridge.service");
const adafruit_module_1 = require("../adafruit/adafruit.module");
const bridge_controller_1 = require("./bridge.controller");
const auth_module_1 = require("../auth/auth.module");
const adafruit_config_1 = require("../adafruit/adafruit_config");
const share_service_1 = require("../share/share.service");
const devices_module_1 = require("../devices/devices.module");
let BridgeModule = class BridgeModule {
};
BridgeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            adafruit_module_1.AdafruitModule,
            devices_module_1.DevicesModule
        ],
        providers: [adafruit_config_1.MqttService, bridge_service_1.BridgeService, share_service_1.ShareService],
        controllers: [bridge_controller_1.BridgeController],
        exports: [bridge_service_1.BridgeService]
    })
], BridgeModule);
exports.BridgeModule = BridgeModule;
//# sourceMappingURL=bridge.module.js.map