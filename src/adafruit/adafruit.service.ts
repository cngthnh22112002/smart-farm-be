import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import * as mqtt from 'mqtt';

@Injectable()
export class AdafruitService {

    constructor(private socketService: SocketGatewayService) {}

    private client: mqtt.Client;
    private clientProxy: ClientProxy;

    private host = "io.adafruit.com";
    private ada_port = "1883";
    private clientId = "smartFarm_backend";
    private feed = process.env.ADA_USERNAME + "/feeds/";

    private connectUrl = `mqtt://${this.host}:${this.ada_port}`;
    private option = {
        clientId: this.clientId,
        clean: true,
        connectTimeout: 10000,
        username: process.env.ADA_USERNAME,
        password: process.env.ADA_PASSWORD,
        reconnectPeriod: 6000,
    }

    public getClient(): mqtt.Client {
        return this.client;
    }

    public getClientProxy(): ClientProxy {
        return this.clientProxy;
    }

    public subscribe(topic: string): void {
        this.client.subscribe( this.feed + topic, (err) => {
            if (err) {
              console.log(`Error subscribing to : ${err}`);
            } else {
              console.log(`Subscribed to ${topic}`);
            }
        });
    }

    public connect(): void {
        this.client = mqtt.connect(this.connectUrl, this.option);
        this.clientProxy = ClientProxyFactory.create({
            transport: Transport.MQTT,
            options: {
                host: 'localhost',
                port: 3000,
            },
        });

        this.client.on('connect', () => {    
            console.log('MQTT client connected');
            this.socketService.server.emit('light-sensor', "Hello");
        });      

        this.client.on('message', (topic: string, message: Buffer) => {
            console.log(`Received message on topic ${topic}: ${message.toString()}`);

            // Handle data from light-sensor
            if(topic == this.feed + 'light-sensor') {
                this.socketService.server.emit('light-sensor', message.toString());
            }

            // Handle data from soilmoisture-sensor
            if(topic == this.feed + 'soilmoisture-sensor') {
                this.socketService.server.emit('soilmoisture-sensor', message.toString());
            }

            // Handle data from humidity-sensor
            if(topic == this.feed + 'humidity-sensor') {
                this.socketService.server.emit('humidity-sensor', message.toString())
            }

            // Handle data from temperature-sensor
            if(topic == this.feed + 'temperature-sensor') {
                this.socketService.server.emit('temperature-sensor', message.toString())
            }

            // Handle data from fan
            if(topic == this.feed + 'fan') {
                this.socketService.server.emit('fan', message.toString())     
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
