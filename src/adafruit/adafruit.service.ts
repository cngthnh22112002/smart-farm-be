import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { User } from 'src/user/schema/user.schema';
import { SensorsService } from 'src/sensors/sensors.service';
import mongoose from 'mongoose';


@Injectable()
export class AdafruitService {
    constructor(
        private socketService: SocketGatewayService,
        private sensorsService: SensorsService,
    )  {}
    

    private feed = process.env.ADA_USERNAME + "/feeds/";
    private led = {
        ledId: '',
        status: ''
    }

    private fan = {
        fanId: '',
        status: ''
    }

    private pump = {
        pumpId: '',
        status: ''
    }

    public subscribe(client: any, topic: string): void {
        client.subscribe( this.feed + topic, (err) => {
            if (err) {
              console.log(`Error subscribing to : ${err}`);
            } else {
              console.log(`Subscribed to ${topic}`);
            }
        });
    }


    public public(client: any, topic: string, message: string): void {
        client.on('connect', () => {    
            client.publish(this.feed + topic, message, (err: any) => {
                if (err) {
                    console.error('failed to publish message:', err);
                  } else {
                    console.log('message published successfully');
                }
            })
        }); 
    }


    public handleData(client: any, user : User, gardenId: string): void {
        const isValidId = mongoose.isValidObjectId(gardenId);
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }

        const gardenIndex = user.gardens.findIndex((garden) => (garden.equals(gardenId)));
        if(gardenIndex === -1) {
          throw new NotFoundException(`Garden with ID ${gardenId} not found for user`);
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
                await this.sensorsService.createTemp(user, record);
            }

            // Handle data from fan
            if(topic == this.feed + 'iot-control.fan') {
                this.socketService.server.emit('fan', message.toString())      
            }

            // Handle data from led
            if(topic == this.feed + 'iot-control.led') {
                this.socketService.server.emit('led', message.toString())     
            }

            // Handle data from fan
            if(topic == this.feed + 'iot-control.pump') {
                this.socketService.server.emit('pump', message.toString())     
            }

            // Handle data from water-pumps
            if(topic == this.feed + 'water-pumps') {
                this.socketService.server.emit('water-pumps', message.toString())
            }

            // Handle data from light
            if(topic == this.feed + 'light') {
                this.socketService.server.emit('light', message.toString())
            }
        });
    }

}
