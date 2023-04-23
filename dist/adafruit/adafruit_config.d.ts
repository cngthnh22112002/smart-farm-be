import * as mqtt from 'mqtt';
export declare class MqttService {
    private client;
    private host;
    private ada_port;
    private clientId;
    private feed;
    private connectUrl;
    private option;
    getClient(): mqtt.Client;
    subscribe(topic: string): void;
    init(): void;
}
