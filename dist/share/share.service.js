"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
let ShareService = class ShareService {
    getLedStatus() {
        return this.ledStatus;
    }
    getFanStatus() {
        return this.fanStatus;
    }
    getPumpStatus() {
        return this.pumpStatus;
    }
    setId(allId) {
        this.gardenId = allId.gardenId;
        this.ledId = allId.ledId;
        this.fanId = allId.fanId;
        this.pumpId = allId.pumpId;
    }
    setLedStatus(status) {
        this.ledStatus = status;
    }
    setFanStatus(status) {
        this.fanStatus = status;
    }
    setPumpStatus(status) {
        this.pumpStatus = status;
    }
};
ShareService = __decorate([
    (0, common_1.Injectable)()
], ShareService);
exports.ShareService = ShareService;
//# sourceMappingURL=share.service.js.map