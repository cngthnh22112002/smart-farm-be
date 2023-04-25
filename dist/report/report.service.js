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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const avg_day_schema_1 = require("./schema/day/avg-day.schema");
const mongoose_1 = require("@nestjs/mongoose");
const avg_month_schema_1 = require("./schema/month/avg-month.schema");
const mongoose_2 = require("mongoose");
const temperature_schema_1 = require("../sensors/schema/temperature.schema");
const humidity_schema_1 = require("../sensors/schema/humidity.schema");
const soilmoisture_schema_1 = require("../sensors/schema/soilmoisture.schema");
const light_schema_1 = require("../sensors/schema/light.schema");
let ReportService = class ReportService {
    constructor(avgdayModel, avgmonthModel, humidityModel, lightModel, soilmoistureModel, temperatureModel) {
        this.avgdayModel = avgdayModel;
        this.avgmonthModel = avgmonthModel;
        this.humidityModel = humidityModel;
        this.lightModel = lightModel;
        this.soilmoistureModel = soilmoistureModel;
        this.temperatureModel = temperatureModel;
    }
    async calculateAverageByDay(type) {
        let model;
        if (type === 'temperature') {
            model = this.temperatureModel;
        }
        else if (type === 'humidity') {
            model = this.humidityModel;
        }
        else if (type === 'soilmoisture') {
            model = this.soilmoistureModel;
        }
        else if (type === 'light') {
            model = this.lightModel;
        }
        else {
            throw new Error('Invalid type parameter');
        }
        const pipeline = [
            {
                $group: {
                    _id: {
                        gardenId: "$gardenId",
                        date: {
                            $dateFromParts: {
                                year: { $year: "$createdAt" },
                                month: { $month: "$createdAt" },
                                day: { $dayOfMonth: "$createdAt" }
                            }
                        }
                    },
                    total: { $sum: "$value" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    gardenId: "$_id.gardenId",
                    year: { $year: "$_id.date" },
                    month: { $month: "$_id.date" },
                    day: { $dayOfMonth: "$_id.date" },
                    average: { $divide: ["$total", "$count"] }
                }
            },
            {
                $sort: {
                    gardenId: 1,
                    year: 1,
                    month: 1,
                    day: 1
                }
            },
            {
                $addFields: {
                    createdAt: {
                        $dateFromString: {
                            dateString: {
                                $concat: [
                                    { $toString: "$year" },
                                    "-",
                                    { $toString: "$month" },
                                    "-",
                                    { $toString: "$day" }
                                ]
                            },
                            format: "%Y-%m-%d"
                        }
                    }
                }
            }
        ];
        const result = await model.aggregate(pipeline).exec();
        for (const r of result) {
            const { gardenId, year, month, day, average } = r;
            const date = new Date(year, month - 1, day);
            const avg = new this.avgdayModel({ gardenId, type, average, createdAt: date });
            await avg.save();
        }
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(avg_day_schema_1.AVGDay.name)),
    __param(1, (0, mongoose_1.InjectModel)(avg_month_schema_1.AVGMonth.name)),
    __param(2, (0, mongoose_1.InjectModel)(humidity_schema_1.Humidity.name)),
    __param(3, (0, mongoose_1.InjectModel)(light_schema_1.Light.name)),
    __param(4, (0, mongoose_1.InjectModel)(soilmoisture_schema_1.Soilmoisture.name)),
    __param(5, (0, mongoose_1.InjectModel)(temperature_schema_1.Temperature.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map