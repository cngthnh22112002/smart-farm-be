"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModule = void 0;
const common_1 = require("@nestjs/common");
const devices_controller_1 = require("./devices.controller");
const devices_service_1 = require("./devices.service");
const waterpump_schema_1 = require("./schema/waterpump.schema");
const fan_schema_1 = require("./schema/fan.schema");
const led_schema_1 = require("./schema/led.schema");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const garden_schema_1 = require("../garden/schema/garden.schema");
let DevicesModule = class DevicesModule {
};
DevicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: led_schema_1.Led.name, schema: led_schema_1.LedSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: fan_schema_1.Fan.name, schema: fan_schema_1.FanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: waterpump_schema_1.Waterpump.name, schema: waterpump_schema_1.WaterpumpSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: garden_schema_1.Garden.name, schema: garden_schema_1.GardenSchema }]),
        ],
        providers: [devices_service_1.DevicesService],
        controllers: [devices_controller_1.DevicesController],
        exports: [devices_service_1.DevicesService]
    })
], DevicesModule);
exports.DevicesModule = DevicesModule;
//# sourceMappingURL=devices.module.js.map