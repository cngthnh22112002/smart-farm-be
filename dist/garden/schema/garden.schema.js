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
exports.GardenSchema = exports.Garden = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Garden = class Garden extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'Vườn mới' }),
    __metadata("design:type", String)
], Garden.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Temperature' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "temperatures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Soilmoisture' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "soilmoistures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Humidity' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "humidities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Lights' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "lights", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Fan' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "fans", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Water_pump' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "water_pumps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Led' }], default: [] }),
    __metadata("design:type", Array)
], Garden.prototype, "leds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Garden.prototype, "userId", void 0);
Garden = __decorate([
    (0, mongoose_1.Schema)()
], Garden);
exports.Garden = Garden;
exports.GardenSchema = mongoose_1.SchemaFactory.createForClass(Garden);
//# sourceMappingURL=garden.schema.js.map