"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdafruitModule = void 0;
const common_1 = require("@nestjs/common");
const adafruit_service_1 = require("./adafruit.service");
const socket_gateway_module_1 = require("../socket_gateway/socket_gateway.module");
let AdafruitModule = class AdafruitModule {
};
AdafruitModule = __decorate([
    (0, common_1.Module)({
        imports: [socket_gateway_module_1.SocketGatewayModule],
        providers: [adafruit_service_1.AdafruitService],
        exports: [adafruit_service_1.AdafruitService]
    })
], AdafruitModule);
exports.AdafruitModule = AdafruitModule;
//# sourceMappingURL=adafruit.module.js.map