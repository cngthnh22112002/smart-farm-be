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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let User = class User extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Garden' }], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "gardens", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Notification' }], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Dictionary' }], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "dictionaries", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map