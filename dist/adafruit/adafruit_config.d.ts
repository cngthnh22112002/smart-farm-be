import * as mqtt from 'mqtt';
export declare class MqttService {
    private client;
    private host;
    private ada_port;
    private feed;
    private connectUrl;
    private option;
    getClient(): mqtt.Client;
    setClient(value: any): void;
    init(): void;
    subscribe(topic: string): void;
}
