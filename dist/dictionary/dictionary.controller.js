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
exports.DictionaryController = void 0;
const common_1 = require("@nestjs/common");
const dictionary_service_1 = require("./dictionary.service");
const create_dictionary_dto_1 = require("./dto/create-dictionary.dto");
const update_dictionary_dto_1 = require("./dto/update-dictionary.dto");
const passport_1 = require("@nestjs/passport");
let DictionaryController = class DictionaryController {
    constructor(dictionaryService) {
        this.dictionaryService = dictionaryService;
    }
    async getAllDictionary(req) {
        return this.dictionaryService.getAllDictionary(req.user);
    }
    async getOneDictionary(req, dictionaryId) {
        return this.dictionaryService.getOneDictionary(req.user, dictionaryId);
    }
    async createNewDictionary(req, createNewDictionary) {
        return this.dictionaryService.createDictionary(req.user, createNewDictionary);
    }
    async deleteOneDictionary(req, dictionaryId) {
        return this.dictionaryService.deleteOneDictionary(req.user, dictionaryId);
    }
    async updateDictionary(req, updateDictionary) {
        return this.dictionaryService.updateDictionary(req.user, updateDictionary);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "getAllDictionary", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "getOneDictionary", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dictionary_dto_1.CreateNewDictionaryDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "createNewDictionary", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "deleteOneDictionary", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dictionary_dto_1.UpdateDictionaryDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "updateDictionary", null);
DictionaryController = __decorate([
    (0, common_1.Controller)('dictionaries'),
    __metadata("design:paramtypes", [dictionary_service_1.DictionaryService])
], DictionaryController);
exports.DictionaryController = DictionaryController;
//# sourceMappingURL=dictionary.controller.js.map