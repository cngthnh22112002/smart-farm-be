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
exports.SocketGatewayService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const websockets_2 = require("@nestjs/websockets");
const class_transformer_1 = require("class-transformer");
let SocketGatewayService = class SocketGatewayService {
    handleConnection(client) {
        console.log(`Client ${client.id} connected`);
    }
    handleDisconnect(client) {
        console.log(`Client ${client.id} disconnected`);
    }
    handleNotification(client, data) {
        const myDto = class_transformer_1.plainToClass;
        this.server.emit('notification', "ok");
    }
    handleOperator(client, payload) {
        this.server.emit('message', 'Hello from the server!');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGatewayService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification'),
    __param(1, (0, websockets_2.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketGatewayService.prototype, "handleNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('operator'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketGatewayService.prototype, "handleOperator", null);
SocketGatewayService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)()
], SocketGatewayService);
exports.SocketGatewayService = SocketGatewayService;
//# sourceMappingURL=socket_gateway.service.js.map