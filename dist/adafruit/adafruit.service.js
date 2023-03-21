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
exports.AdafruitService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const socket_gateway_service_1 = require("../socket_gateway/socket_gateway.service");
const mqtt = require("mqtt");
let AdafruitService = class AdafruitService {
    constructor(socketService) {
        this.socketService = socketService;
        this.host = "io.adafruit.com";
        this.ada_port = "1883";
        this.clientId = "smartFarm_backend";
        this.feed = process.env.ADA_USERNAME + "/feeds/";
        this.connectUrl = `mqtt://${this.host}:${this.ada_port}`;
        this.option = {
            clientId: this.clientId,
            clean: true,
            connectTimeout: 10000,
            username: process.env.ADA_USERNAME,
            password: process.env.ADA_PASSWORD,
            reconnectPeriod: 6000,
        };
    }
    getClient() {
        return this.client;
    }
    getClientProxy() {
        return this.clientProxy;
    }
    subscribe(topic) {
        this.client.subscribe(this.feed + topic, (err) => {
            if (err) {
                console.log(`Error subscribing to : ${err}`);
            }
            else {
                console.log(`Subscribed to ${topic}`);
            }
        });
    }
    connect() {
        this.client = mqtt.connect(this.connectUrl, this.option);
        this.clientProxy = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.MQTT,
            options: {
                host: 'localhost',
                port: 3000,
            },
        });
        this.client.on('connect', () => {
            console.log('MQTT client connected');
            this.socketService.server.emit('light-sensor', "Hello");
        });
        this.client.on('message', (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            if (topic == this.feed + 'light-sensor') {
                this.socketService.server.emit('light-sensor', message.toString());
            }
            if (topic == this.feed + 'soilmoisture-sensor') {
                this.socketService.server.emit('soilmoisture-sensor', message.toString());
            }
            if (topic == this.feed + 'humidity-sensor') {
                this.socketService.server.emit('humidity-sensor', message.toString());
            }
            if (topic == this.feed + 'temperature-sensor') {
                this.socketService.server.emit('temperature-sensor', message.toString());
            }
            if (topic == this.feed + 'fan') {
                this.socketService.server.emit('fan', message.toString());
            }
            if (topic == this.feed + 'water-pumps') {
                this.socketService.server.emit('water-pumps', message.toString());
            }
            if (topic == this.feed + 'light') {
                this.socketService.server.emit('light', message.toString());
            }
        });
    }
};
AdafruitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [socket_gateway_service_1.SocketGatewayService])
], AdafruitService);
exports.AdafruitService = AdafruitService;
//# sourceMappingURL=adafruit.service.js.map