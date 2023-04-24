import { Injectable, NotFoundException } from '@nestjs/common';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { User } from 'src/user/schema/user.schema';
import { SensorsService } from 'src/sensors/sensors.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Garden } from 'src/garden/schema/garden.schema';
import mongoose from 'mongoose';
import { Led } from 'src/devices/schema/led.schema';
import { Fan } from 'src/devices/schema/fan.schema';
import { Waterpump } from 'src/devices/schema/waterpump.schema';
import { ShareService } from 'src/share/share.service';


@Injectable()
export class AdafruitService {
    constructor(
        private socketService: SocketGatewayService,
        private sensorsService: SensorsService,
        private shareService: ShareService,

        @InjectModel(Garden.name)
        private gardenModel: mongoose.Model<Garden>,

        @InjectModel(Led.name)
        private ledModel: mongoose.Model<Led>,
    
        @InjectModel(Fan.name)
        private fanModel: mongoose.Model<Fan>,
    
        @InjectModel(Waterpump.name)
        private waterpumpModel: mongoose.Model<Waterpump>,
    )  {}
    

    private feed = process.env.ADA_USERNAME + "/feeds/";

    public subscribe(client: any, topic: string): void {
        client.subscribe( this.feed + topic, (err) => {
            if (err) {
              console.log(`Error subscribing to : ${err}`);
            } else {
              console.log(`Subscribed to ${topic}`);
            }
        });
    }
    
    public publish(client:any, topic: string, message: string): void {
        client.publish(this.feed + topic, message, (err: any) => {
            if (err) {
                console.error('failed to publish message:', err);
            }
        });
    }


    public async handleData(client: any, user : User, garden_id: GardenIdDto) {
        this.socketService.setClient(client);

        const gardenId = garden_id.gardenId;
        const garden = await this.gardenModel.findById(gardenId);

        if(!garden) {
            throw new NotFoundException(`Garden with ID ${gardenId} not found `);
        }

        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
        }  

        if(!garden.leds) {
            throw new NotFoundException(`Led with Garden ID ${gardenId} not found `);
        }
        else if(!garden.fans) {
            throw new NotFoundException(`Fan with Garden ID ${gardenId} not found `);
        }
        else if(!garden.water_pumps) {
            throw new NotFoundException(`Water-pump with Garden ID ${gardenId} not found `);
        }

        client.on('message', async (topic: string, message: Buffer) => {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);

            // Handle data from light-sensor
            if(topic == this.feed + 'iot-sensor.lux') {
                const now = new Date();
                const data = {
                  value: message.toString(),
                  createAt: now.toISOString()
                };
                this.socketService.server.emit('light-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                }
                await this.sensorsService.createLight(user, record);
            }

            // Handle data from soilmoisture-sensor
            if(topic == this.feed + 'iot-sensor.sm') {
                const now = new Date();
                const data = {
                  value: message.toString(),
                  createAt: now.toISOString()
                };
                this.socketService.server.emit('soilmoisture-sensor', JSON.stringify(data));
                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                }
                await this.sensorsService.createSm(user, record);
            }

            // Handle data from humidity-sensor
            if(topic == this.feed + 'iot-sensor.humi') {
                const now = new Date();
                const data = {
                  value: message.toString(),
                  createAt: now.toISOString()
                };
                this.socketService.server.emit('humidity-sensor', JSON.stringify(data));

                const record = {
                    gardenId: user.gardens[gardenIndex]._id,
                    value: parseFloat(message.toString())
                }
                await this.sensorsService.createHumi(user, record);
            }

            // Handle data from temperature-sensor
            if(topic == this.feed + 'iot-sensor.temp') {
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
                }
                const x = await this.sensorsService.createTemp(user, record);
                console.log(x);
            }

            // Handle data from fan
            if(topic == this.feed + 'iot-control.fan') {
                this.socketService.server.emit('fan', message.toString());
                this.shareService.setFanStatus(message.toString());
            }

            // Handle data from led
            if(topic == this.feed + 'iot-control.led') {
                this.socketService.server.emit('led', message.toString());  
                this.shareService.setLedStatus(message.toString());
            }

            // Handle data from fan
            if(topic == this.feed + 'iot-control.pump') {
                this.socketService.server.emit('pump', message.toString()); 
                this.shareService.setPumpStatus(message.toString());
            }
        });
    }

}
