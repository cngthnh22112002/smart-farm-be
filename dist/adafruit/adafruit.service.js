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
const socket_gateway_service_1 = require("../socket_gateway/socket_gateway.service");
const sensors_service_1 = require("../sensors/sensors.service");
const mongoose_1 = require("mongoose");
let AdafruitService = class AdafruitService {
    constructor(socketService, sensorsService) {
        this.socketService = socketService;
        this.sensorsService = sensorsService;
        this.feed = process.env.ADA_USERNAME + "/feeds/";
        this.led = {
            ledId: '',
            status: ''
        };
        this.fan = {
            fanId: '',
            status: ''
        };
        this.pump = {
            pumpId: '',
            status: ''
        };
    }
    subscribe(client, topic) {
        client.subscribe(this.feed + topic, (err) => {
            if (err) {
                console.log(`Error subscribing to : ${err}`);
            }
            else {
                console.log(`Subscribed to ${topic}`);
            }
        });
    }
    public(client, topic, message) {
        client.on('connect', () => {
            client.publish(this.feed + topic, message, (err) => {
                if (err) {
                    console.error('failed to publish message:', err);
                }
                else {
                    console.log('message published successfully');
                }
            });
        });
    }
    handleData(client, user, gardenId) {
        const isValidId = mongoose_1.default.isValidObjectId(gardenId);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        client.on('message', async (topic, message) => {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);
            if (topic == this.feed + 'iot-sensor.lux') {
                const now = new Date();
                const data = {
                    value: message.toString(),
                    createAt: now.toISOString()
                };
                this.socketService.server.emit('light-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                };
                await this.sensorsService.createLight(user, record);
            }
            if (topic == this.feed + 'iot-sensor.sm') {
                const now = new Date();
                const data = {
                    value: message.toString(),
                    createAt: now.toISOString()
                };
                this.socketService.server.emit('soilmoisture-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                };
                await this.sensorsService.createSm(user, record);
            }
            if (topic == this.feed + 'iot-sensor.humi') {
                const now = new Date();
                const data = {
                    value: message.toString(),
                    createAt: now.toISOString()
                };
                this.socketService.server.emit('humidity-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                };
                await this.sensorsService.createHumi(user, record);
            }
            if (topic == this.feed + 'iot-sensor.temp') {
                const now = new Date();
                const data = {
                    value: message.toString(),
                    createAt: now.toISOString()
                };
                console.log(data);
                this.socketService.server.emit('temperature-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                };
                await this.sensorsService.createTemp(user, record);
            }
            if (topic == this.feed + 'iot-control.fan') {
                this.socketService.server.emit('fan', message.toString());
            }
            if (topic == this.feed + 'iot-control.led') {
                this.socketService.server.emit('led', message.toString());
            }
            if (topic == this.feed + 'iot-control.pump') {
                this.socketService.server.emit('pump', message.toString());
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
    __metadata("design:paramtypes", [socket_gateway_service_1.SocketGatewayService,
        sensors_service_1.SensorsService])
], AdafruitService);
exports.AdafruitService = AdafruitService;
//# sourceMappingURL=adafruit.service.js.map