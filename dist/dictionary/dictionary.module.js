"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictionaryModule = void 0;
const common_1 = require("@nestjs/common");
const dictionary_service_1 = require("./dictionary.service");
const dictionary_controller_1 = require("./dictionary.controller");
const mongoose_1 = require("@nestjs/mongoose");
const dictionary_schema_1 = require("./schema/dictionary.schema");
const user_schema_1 = require("../user/schema/user.schema");
const auth_module_1 = require("../auth/auth.module");
let DictionaryModule = class DictionaryModule {
};
DictionaryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: dictionary_schema_1.Dictionary.name, schema: dictionary_schema_1.DictionarySchema }])
        ],
        providers: [dictionary_service_1.DictionaryService],
        controllers: [dictionary_controller_1.DictionaryController]
    })
], DictionaryModule);
exports.DictionaryModule = DictionaryModule;
//# sourceMappingURL=dictionary.module.js.map