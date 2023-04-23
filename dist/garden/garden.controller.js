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
exports.GardenController = void 0;
const common_1 = require("@nestjs/common");
const garden_service_1 = require("./garden.service");
const passport_1 = require("@nestjs/passport");
const update_garden_dto_1 = require("./dto/update-garden.dto");
const create_garden_dto_1 = require("./dto/create-garden.dto");
let GardenController = class GardenController {
    constructor(gardenService) {
        this.gardenService = gardenService;
    }
    async getOneGarden(req, gardenId) {
        return this.gardenService.getOneGarden(req.user, gardenId);
    }
    async getAllGarden(req) {
        return this.gardenService.getAllGarden(req.user);
    }
    async createBlankNewGarden(req) {
        return this.gardenService.createBlankGarden(req.user);
    }
    async createNewGarden(req, newGarden) {
        return this.gardenService.createNewGarden(req.user, newGarden);
    }
    async updateGarden(req, updateGarden) {
        return this.gardenService.updateGarden(req.user, updateGarden);
    }
    async deleteAllGarden(req) {
        return this.gardenService.deleteAllGarden(req.user);
    }
    async deleteOneGarden(req, gardenId) {
        return this.gardenService.deleteOneGarden(req.user, gardenId);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "getOneGarden", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "getAllGarden", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "createBlankNewGarden", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_garden_dto_1.CreateGardenDto]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "createNewGarden", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_garden_dto_1.UpdateGardenDto]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "updateGarden", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "deleteAllGarden", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "deleteOneGarden", null);
GardenController = __decorate([
    (0, common_1.Controller)('gardens'),
    __metadata("design:paramtypes", [garden_service_1.GardenService])
], GardenController);
exports.GardenController = GardenController;
//# sourceMappingURL=garden.controller.js.map