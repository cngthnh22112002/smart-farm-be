"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenModule = void 0;
const common_1 = require("@nestjs/common");
const garden_service_1 = require("./garden.service");
const garden_controller_1 = require("./garden.controller");
const mongoose_1 = require("@nestjs/mongoose");
const garden_schema_1 = require("./schema/garden.schema");
const user_schema_1 = require("../user/schema/user.schema");
const auth_module_1 = require("../auth/auth.module");
const devices_module_1 = require("../devices/devices.module");
let GardenModule = class GardenModule {
};
GardenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            devices_module_1.DevicesModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: garden_schema_1.Garden.name, schema: garden_schema_1.GardenSchema }])
        ],
        providers: [garden_service_1.GardenService],
        controllers: [garden_controller_1.GardenController]
    })
], GardenModule);
exports.GardenModule = GardenModule;
//# sourceMappingURL=garden.module.js.map