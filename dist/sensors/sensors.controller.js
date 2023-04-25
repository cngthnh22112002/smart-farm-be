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
exports.SensorsController = void 0;
const common_1 = require("@nestjs/common");
const sensors_service_1 = require("./sensors.service");
const passport_1 = require("@nestjs/passport");
const report_dto_1 = require("../report/dto/report.dto");
let SensorsController = class SensorsController {
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    async getTodayTemp(req, report) {
        return this.sensorService.getTodayReport(req.user, report);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)('today'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, report_dto_1.ReportDto]),
    __metadata("design:returntype", Promise)
], SensorsController.prototype, "getTodayTemp", null);
SensorsController = __decorate([
    (0, common_1.Controller)('sensors'),
    __metadata("design:paramtypes", [sensors_service_1.SensorsService])
], SensorsController);
exports.SensorsController = SensorsController;
//# sourceMappingURL=sensors.controller.js.map