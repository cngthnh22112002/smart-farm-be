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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureSchema = exports.Temperature = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../../user/schema/user.schema");
let Temperature = class Temperature {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Temperature.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            value: { type: Number, required: true },
            time: { type: Date, required: true },
        },
    ]),
    __metadata("design:type", Array)
], Temperature.prototype, "temperature", void 0);
Temperature = __decorate([
    (0, mongoose_1.Schema)()
], Temperature);
exports.Temperature = Temperature;
exports.TemperatureSchema = mongoose_1.SchemaFactory.createForClass(Temperature);
//# sourceMappingURL=temperature.schema.js.map