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
exports.AdafruitService = void 0;
const common_1 = require("@nestjs/common");
const socket_gateway_service_1 = require("../socket_gateway/socket_gateway.service");
const sensors_service_1 = require("../sensors/sensors.service");
const mongoose_1 = require("@nestjs/mongoose");
const garden_schema_1 = require("../garden/schema/garden.schema");
const mongoose_2 = require("mongoose");
const share_service_1 = require("../share/share.service");
const notification_service_1 = require("../notification/notification.service");
let AdafruitService = class AdafruitService {
    constructor(socketService, sensorsService, shareService, notificationService, gardenModel) {
        this.socketService = socketService;
        this.sensorsService = sensorsService;
        this.shareService = shareService;
        this.notificationService = notificationService;
        this.gardenModel = gardenModel;
        this.feed = process.env.ADA_USERNAME + "/feeds/";
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
    disconnect(client) {
        client.end();
    }
    publish(client, topic, message) {
        client.publish(this.feed + topic, message, (err) => {
            if (err) {
                console.error('failed to publish message:', err);
            }
        });
    }
    async handleData(client, user, garden_id) {
        this.socketService.setClient(client);
        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);
        if (!garden) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found `);
        }
        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if (gardenIndex === -1) {
            throw new common_1.NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }
        if (!garden.leds) {
            throw new common_1.NotFoundException(`Led with Garden ID ${gardenId} not found `);
        }
        else if (!garden.fans) {
            throw new common_1.NotFoundException(`Fan with Garden ID ${gardenId} not found `);
        }
        else if (!garden.water_pumps) {
            throw new common_1.NotFoundException(`Water-pump with Garden ID ${gardenId} not found `);
        }
        client.on('message', async (topic, message) => {
            var lux = parseFloat(message.toString());
            if (topic == this.feed + 'iot-sensor.lux') {
                const now = new Date();
                const data = {
                    value: message.toString(),
                    createAt: now.toISOString()
                };
                this.socketService.server.emit('light-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: lux
                };
                await this.sensorsService.createLight(user, record);
                if (lux < 2000) {
                    this.socketService.server.emit('led', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.led', '1');
                }
                else if (lux > 2000) {
                    this.socketService.server.emit('led', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.led', '0');
                }
            }
            if (topic == this.feed + 'iot-sensor.sm') {
                var sm = parseFloat(message.toString());
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
                if (sm < 5) {
                    this.socketService.server.emit('pump', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.pump', '1');
                }
                else if (sm > 5) {
                    this.socketService.server.emit('pump', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.pump', '0');
                }
            }
            if (topic == this.feed + 'iot-sensor.humi') {
                var humi = parseFloat(message.toString());
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
                if (humi < 50) {
                    this.socketService.server.emit('pump', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.pump', '1');
                }
                else if (humi > 50) {
                    this.socketService.server.emit('pump', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.pump', '0');
                }
            }
            if (topic == this.feed + 'iot-sensor.temp') {
                var temp = parseFloat(message.toString());
                const now = new Date();
                const data = {
                    value: message.toString(),
                    createAt: now.toISOString()
                };
                this.socketService.server.emit('temperature-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                };
                await this.sensorsService.createTemp(user, record);
                if (temp > 27) {
                    this.socketService.server.emit('fan', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.fan', '1');
                }
                else if (temp < 27) {
                    this.socketService.server.emit('fan', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client, 'iot-control.fan', '0');
                }
            }
            if (topic == this.feed + 'iot-control.fan') {
                this.socketService.server.emit('fan', message.toString());
                this.shareService.setFanStatus(message.toString());
            }
            if (topic == this.feed + 'iot-control.led') {
                this.socketService.server.emit('led', message.toString());
                this.shareService.setLedStatus(message.toString());
            }
            if (topic == this.feed + 'iot-control.pump') {
                this.socketService.server.emit('pump', message.toString());
                this.shareService.setPumpStatus(message.toString());
            }
        });
    }
};
AdafruitService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)(garden_schema_1.Garden.name)),
    __metadata("design:paramtypes", [socket_gateway_service_1.SocketGatewayService,
        sensors_service_1.SensorsService,
        share_service_1.ShareService,
        notification_service_1.NotificationService, mongoose_2.default.Model])
], AdafruitService);
exports.AdafruitService = AdafruitService;
//# sourceMappingURL=adafruit.service.js.map