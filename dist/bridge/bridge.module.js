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
const socket_gateway_module_1 = require("../socket_gateway/socket_gateway.module");
const bridge_controller_1 = require("./bridge.controller");
let BridgeModule = class BridgeModule {
};
BridgeModule = __decorate([
    (0, common_1.Module)({
        imports: [adafruit_module_1.AdafruitModule, socket_gateway_module_1.SocketGatewayModule],
        providers: [bridge_service_1.BridgeService],
        controllers: [bridge_controller_1.BridgeController],
    })
], BridgeModule);
exports.BridgeModule = BridgeModule;
//# sourceMappingURL=bridge.module.js.map