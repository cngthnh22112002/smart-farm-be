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
const led_schema_1 = require("../devices/schema/led.schema");
const fan_schema_1 = require("../devices/schema/fan.schema");
const waterpump_schema_1 = require("../devices/schema/waterpump.schema");
const share_service_1 = require("../share/share.service");
let AdafruitService = class AdafruitService {
    constructor(socketService, sensorsService, shareService, gardenModel, ledModel, fanModel, waterpumpModel) {
        this.socketService = socketService;
        this.sensorsService = sensorsService;
        this.shareService = shareService;
        this.gardenModel = gardenModel;
        this.ledModel = ledModel;
        this.fanModel = fanModel;
        this.waterpumpModel = waterpumpModel;
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
    __param(3, (0, mongoose_1.InjectModel)(garden_schema_1.Garden.name)),
    __param(4, (0, mongoose_1.InjectModel)(led_schema_1.Led.name)),
    __param(5, (0, mongoose_1.InjectModel)(fan_schema_1.Fan.name)),
    __param(6, (0, mongoose_1.InjectModel)(waterpump_schema_1.Waterpump.name)),
    __metadata("design:paramtypes", [socket_gateway_service_1.SocketGatewayService,
        sensors_service_1.SensorsService,
        share_service_1.ShareService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], AdafruitService);
exports.AdafruitService = AdafruitService;
//# sourceMappingURL=adafruit.service.js.map