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
const sensors_module_1 = require("../sensors/sensors.module");
const socket_gateway_service_1 = require("../socket_gateway/socket_gateway.service");
const adafruit_config_1 = require("./adafruit_config");
const devices_module_1 = require("../devices/devices.module");
const mongoose_1 = require("@nestjs/mongoose");
const led_schema_1 = require("../devices/schema/led.schema");
const fan_schema_1 = require("../devices/schema/fan.schema");
const waterpump_schema_1 = require("../devices/schema/waterpump.schema");
const garden_schema_1 = require("../garden/schema/garden.schema");
const share_service_1 = require("../share/share.service");
let AdafruitModule = class AdafruitModule {
};
AdafruitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sensors_module_1.SensorsModule,
            devices_module_1.DevicesModule,
            mongoose_1.MongooseModule.forFeature([{ name: led_schema_1.Led.name, schema: led_schema_1.LedSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: fan_schema_1.Fan.name, schema: fan_schema_1.FanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: waterpump_schema_1.Waterpump.name, schema: waterpump_schema_1.WaterpumpSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: garden_schema_1.Garden.name, schema: garden_schema_1.GardenSchema }]),
        ],
        providers: [adafruit_config_1.MqttService, share_service_1.ShareService, adafruit_service_1.AdafruitService, socket_gateway_service_1.SocketGatewayService,],
        exports: [adafruit_service_1.AdafruitService]
    })
], AdafruitModule);
exports.AdafruitModule = AdafruitModule;
//# sourceMappingURL=adafruit.module.js.map