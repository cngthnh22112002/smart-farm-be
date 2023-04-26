"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const auth_module_1 = require("../auth/auth.module");
const avg_day_schema_1 = require("./schema/day/avg-day.schema");
const avg_month_schema_1 = require("./schema/month/avg-month.schema");
const mongoose_1 = require("@nestjs/mongoose");
const humidity_schema_1 = require("../sensors/schema/humidity.schema");
const light_schema_1 = require("../sensors/schema/light.schema");
const soilmoisture_schema_1 = require("../sensors/schema/soilmoisture.schema");
const temperature_schema_1 = require("../sensors/schema/temperature.schema");
const garden_module_1 = require("../garden/garden.module");
const schedule_1 = require("@nestjs/schedule");
let ReportModule = class ReportModule {
};
ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            garden_module_1.GardenModule,
            mongoose_1.MongooseModule.forFeature([{ name: avg_day_schema_1.AVGDay.name, schema: avg_day_schema_1.AVGDaySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: avg_month_schema_1.AVGMonth.name, schema: avg_month_schema_1.AVGMonthSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: humidity_schema_1.Humidity.name, schema: humidity_schema_1.HumiditySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: light_schema_1.Light.name, schema: light_schema_1.LightSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: soilmoisture_schema_1.Soilmoisture.name, schema: soilmoisture_schema_1.SoilmoistureSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: temperature_schema_1.Temperature.name, schema: temperature_schema_1.TemperatureSchema }]),
        ],
        providers: [report_service_1.ReportService],
        controllers: [report_controller_1.ReportController]
    })
], ReportModule);
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map