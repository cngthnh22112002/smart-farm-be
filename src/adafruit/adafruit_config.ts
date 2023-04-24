import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.Client;

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

  public init() {
      this.client = mqtt.connect(this.connectUrl, this.option);

      this.client.on('connect', () => {    
          console.log('MQTT client connected');
      });  

      const sensor = ['temp', 'lux', 'humi', 'sm'];
      const control = ['led', 'fan', 'pump'];

      for(var topic of sensor) {
        this.subscribe('iot-sensor.'+ topic);
      }

      for(var topic of control) {
        this.subscribe('iot-control.' + topic);
      }
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

}