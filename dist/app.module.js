"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const mongoose_module_1 = require("./mongoose/mongoose.module");
const auth_module_1 = require("./auth/auth.module");
const bridge_module_1 = require("./bridge/bridge.module");
<<<<<<< Updated upstream
=======
const garden_module_1 = require("./garden/garden.module");
const notification_module_1 = require("./notification/notification.module");
const dictionary_module_1 = require("./dictionary/dictionary.module");
const sensors_module_1 = require("./sensors/sensors.module");
const devices_module_1 = require("./devices/devices.module");
const cors = require("cors");
>>>>>>> Stashed changes
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true
            }),
            auth_module_1.AuthModule,
<<<<<<< Updated upstream
            bridge_module_1.BridgeModule
=======
            mongoose_module_1.MongooseConnectiton,
            user_module_1.UserModule,
            bridge_module_1.BridgeModule,
            sensors_module_1.SensorsModule,
            garden_module_1.GardenModule,
            notification_module_1.NotificationModule,
            dictionary_module_1.DictionaryModule,
            devices_module_1.DevicesModule,
>>>>>>> Stashed changes
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map