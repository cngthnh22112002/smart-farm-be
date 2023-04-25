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
const schedule = require("node-schedule");
const temperature_schema_1 = require("../sensors/schema/temperature.schema");
const humidity_schema_1 = require("../sensors/schema/humidity.schema");
const soilmoisture_schema_1 = require("../sensors/schema/soilmoisture.schema");
const light_schema_1 = require("../sensors/schema/light.schema");
const garden_service_1 = require("../garden/garden.service");
let ReportService = class ReportService {
    constructor(avgdayModel, avgmonthModel, humidityModel, lightModel, soilmoistureModel, temperatureModel, gardenService) {
        this.avgdayModel = avgdayModel;
        this.avgmonthModel = avgmonthModel;
        this.humidityModel = humidityModel;
        this.lightModel = lightModel;
        this.soilmoistureModel = soilmoistureModel;
        this.temperatureModel = temperatureModel;
        this.gardenService = gardenService;
        schedule.scheduleJob('0 0 * * *', () => {
            this.calculateAverageByDay('temperature');
            this.calculateAverageByDay('humidity');
            this.calculateAverageByDay('soilmoisture');
            this.calculateAverageByDay('light');
        });
        schedule.scheduleJob('0 0 1 * *', () => {
            this.calculateAverageByMonth('temperature');
            this.calculateAverageByMonth('humidity');
            this.calculateAverageByMonth('soilmoisture');
            this.calculateAverageByMonth('light');
        });
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
    ;
    async calculateAverageByMonth(type) {
        let model;
        if (type === 'temperature') {
            model = this.avgdayModel;
        }
        else if (type === 'humidity') {
        }
        else if (type === 'soilmoisture') {
        }
        else if (type === 'light') {
        }
        else {
            throw new Error('Invalid type parameter');
        }
        const pipeline = [
            {
                $match: {
                    type: type
                }
            },
            {
                $group: {
                    _id: {
                        gardenId: "$gardenId",
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    total: { $sum: "$average" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    gardenId: "$_id.gardenId",
                    year: "$_id.year",
                    month: "$_id.month",
                    average: { $divide: ["$total", "$count"] }
                }
            },
            {
                $sort: {
                    gardenId: 1,
                    year: 1,
                    month: 1
                }
            }
        ];
        const result = await model.aggregate(pipeline).exec();
        for (const r of result) {
            const { gardenId, year, month, average } = r;
            const date = new Date(year, month - 1, 1);
            const avg = new this.avgmonthModel({ gardenId, type, average, createdAt: date });
            await avg.save();
        }
    }
    ;
    async getAvgForPastWeek(user, report) {
        const garden = this.gardenService.getOneGarden(user, { gardenId: report.gardenId });
        const type = report.type;
        const startOfPastWeek = new Date();
        startOfPastWeek.setDate(startOfPastWeek.getDate() - 7);
        startOfPastWeek.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        const pastWeekReports = await this.avgdayModel.aggregate([
            {
                $match: {
                    gardenId: (await garden)._id,
                    type: type,
                    createdAt: { $gte: startOfPastWeek, $lte: endOfToday },
                },
            },
            {
                $lookup: {
                    from: 'gardens',
                    localField: 'gardenId',
                    foreignField: '_id',
                    as: 'garden',
                },
            },
            {
                $project: {
                    _id: 1,
                    average: 1,
                    createdAt: 1,
                    gardenId: 1
                },
            },
        ]);
        return pastWeekReports;
    }
    async getAvgForPastYear(user, report) {
        const garden = this.gardenService.getOneGarden(user, { gardenId: report.gardenId });
        const type = report.type;
        const currentYear = new Date().getFullYear();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentYear - 1);
        const query = {
            gardenId: (await garden)._id,
            type: type,
            createdAt: { $gte: oneYearAgo },
            $expr: {
                $eq: [{ $year: "$createdAt" }, currentYear]
            }
        };
        const result = await this.avgmonthModel.find(query).sort({ createdAt: 'asc' }).exec();
        return result;
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
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, garden_service_1.GardenService])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map