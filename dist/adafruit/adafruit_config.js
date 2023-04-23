"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const mqtt = require("mqtt");
let MqttService = class MqttService {
    constructor() {
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
    init() {
        this.client = mqtt.connect(this.connectUrl, this.option);
        this.client.on('connect', () => {
            console.log('MQTT client connected');
        });
        const sensor = ['temp', 'lux', 'humi', 'sm'];
        const control = ['led', 'fan', 'pump'];
        for (var topic of sensor) {
            this.subscribe('iot-sensor.' + topic);
        }
        for (var topic of control) {
            this.subscribe('iot-control.' + topic);
        }
    }
};
MqttService = __decorate([
    (0, common_1.Injectable)()
], MqttService);
exports.MqttService = MqttService;
//# sourceMappingURL=adafruit_config.js.map