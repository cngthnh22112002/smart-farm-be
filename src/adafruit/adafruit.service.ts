import { Injectable, NotFoundException } from '@nestjs/common';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { User } from 'src/user/schema/user.schema';
import { SensorsService } from 'src/sensors/sensors.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Garden } from 'src/garden/schema/garden.schema';
import mongoose from 'mongoose';
import { ShareService } from 'src/share/share.service';
import { NotificationService } from 'src/notification/notification.service';


@Injectable()
export class AdafruitService {
    constructor(
        private socketService: SocketGatewayService,
        private sensorsService: SensorsService,
        private shareService: ShareService,
        private notificationService: NotificationService,

        @InjectModel(Garden.name)
        private gardenModel: mongoose.Model<Garden>,
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

    public disconnect(client: any): void {
        client.end();
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
            //console.log(`Received message on topic ${topic}: ${message.toString()}`);

            var lux = parseFloat(message.toString());
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
                    value: lux
                }
                await this.sensorsService.createLight(user, record);
                if( lux < 2000 ) {
                    this.socketService.server.emit('led', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.led', '1');
                } else if (lux > 2000) {
                    this.socketService.server.emit('led', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.led', '0');
                }
            }

            // Handle data from soilmoisture-sensor
            if(topic == this.feed + 'iot-sensor.sm') {
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
                }
                await this.sensorsService.createSm(user, record);
                if( sm < 5 ) {
                    this.socketService.server.emit('pump', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.pump', '1');
                } else if (sm > 5) {
                    this.socketService.server.emit('pump', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.pump', '0');
                }
            }

            // Handle data from humidity-sensor
            if(topic == this.feed + 'iot-sensor.humi') {
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
                }
                await this.sensorsService.createHumi(user, record);
                if( humi < 50 ) {
                    this.socketService.server.emit('pump', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.pump', '1');
                } else if( humi > 50 ) {
                    this.socketService.server.emit('pump', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.pump', '0');
                }
            }

            // Handle data from temperature-sensor
            if(topic == this.feed + 'iot-sensor.temp') {
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
                }
                await this.sensorsService.createTemp(user, record);
                if( temp > 27 ) {
                    this.socketService.server.emit('fan', '1');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.fan', '1');
                } else if( temp < 27 ) {
                    this.socketService.server.emit('fan', '0');
                    this.shareService.setFanStatus(message.toString());
                    this.publish(client,'iot-control.fan', '0');
                }
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
