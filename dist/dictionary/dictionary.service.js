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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dictionary_schema_1 = require("./schema/dictionary.schema");
const mongoose_2 = require("mongoose");
let DictionaryService = class DictionaryService {
    constructor(dictionaryModel) {
        this.dictionaryModel = dictionaryModel;
    }
    async createDictionary(user, createNewDictionary) {
        const newDictionary = await this.dictionaryModel.create(Object.assign(Object.assign({}, createNewDictionary), { userId: user._id }));
        user.dictionaries.push(newDictionary._id);
        user.save();
        return newDictionary;
    }
    async getOneDictionary(user, dictionaryId) {
        const isValidId = mongoose_2.default.isValidObjectId(dictionaryId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const dictionaryIndex = user.dictionaries.findIndex((dictionary) => (dictionary.equals(dictionaryId)));
        if (dictionaryIndex === -1) {
            throw new common_1.NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
        }
        const dictionary = await this.dictionaryModel.findById(dictionaryId).exec();
        return dictionary;
    }
    async getAllDictionary(user) {
        if (!user.dictionaries) {
            throw new common_1.NotFoundException(`Dictionary with ID ${user._id} not found`);
        }
        const allDictionary = await this.dictionaryModel.find({ userId: user._id }).exec();
        return allDictionary;
    }
    async deleteAllDictionary(user) {
        user.dictionaries.splice(0, user.dictionaries.length);
        await this.dictionaryModel.deleteMany({ userId: user._id });
        return user.save();
    }
    async deleteOneDictionary(user, dictionaryId) {
        const isValidId = mongoose_2.default.isValidObjectId(dictionaryId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const deleteDictionary = await this.dictionaryModel.findOneAndDelete({ _id: dictionaryId });
        if (!deleteDictionary) {
            throw new common_1.NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
        }
        const dictionaryIndex = user.dictionaries.findIndex((dictionary) => (dictionary.equals(deleteDictionary._id)));
        if (dictionaryIndex === -1) {
            throw new common_1.NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
        }
        user.dictionaries.splice(dictionaryIndex, 1);
        return user.save();
    }
    async updateDictionary(user, updateDictionary) {
        const { dictionaryId } = updateDictionary, updatedDictionary = __rest(updateDictionary, ["dictionaryId"]);
        const dictionaryIndex = user.dictionaries.findIndex((dictionary) => (dictionary.equals(dictionaryId)));
        if (dictionaryIndex === -1) {
            throw new common_1.NotFoundException(`Dictionary with ID ${dictionaryId} not found for user`);
        }
        const newDictionary = await this.dictionaryModel.findByIdAndUpdate(dictionaryId, updatedDictionary, { new: true });
        if (!newDictionary) {
            throw new common_1.NotFoundException(`Dictionary with ID ${dictionaryId} not found`);
        }
        newDictionary.save();
        return newDictionary;
    }
};
DictionaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dictionary_schema_1.Dictionary.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], DictionaryService);
exports.DictionaryService = DictionaryService;
//# sourceMappingURL=dictionary.service.js.map