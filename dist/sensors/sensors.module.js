"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorsModule = void 0;
const common_1 = require("@nestjs/common");
const sensors_service_1 = require("./sensors.service");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const garden_schema_1 = require("../garden/schema/garden.schema");
const humidity_schema_1 = require("./schema/humidity.schema");
const light_schema_1 = require("./schema/light.schema");
const soilmoisture_schema_1 = require("./schema/soilmoisture.schema");
const temperature_schema_1 = require("./schema/temperature.schema");
const sensors_controller_1 = require("./sensors.controller");
const garden_module_1 = require("../garden/garden.module");
let SensorsModule = class SensorsModule {
};
SensorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            garden_module_1.GardenModule,
            mongoose_1.MongooseModule.forFeature([{ name: garden_schema_1.Garden.name, schema: garden_schema_1.GardenSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: humidity_schema_1.Humidity.name, schema: humidity_schema_1.HumiditySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: light_schema_1.Light.name, schema: light_schema_1.LightSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: soilmoisture_schema_1.Soilmoisture.name, schema: soilmoisture_schema_1.SoilmoistureSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: temperature_schema_1.Temperature.name, schema: temperature_schema_1.TemperatureSchema }]),
        ],
        providers: [sensors_service_1.SensorsService],
        exports: [sensors_service_1.SensorsService],
        controllers: [sensors_controller_1.SensorsController]
    })
], SensorsModule);
exports.SensorsModule = SensorsModule;
//# sourceMappingURL=sensors.module.js.map