import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { User } from 'src/user/schema/user.schema';
import { SensorsService } from 'src/sensors/sensors.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { Garden } from 'src/garden/schema/garden.schema';
import mongoose from 'mongoose';
import { Led } from 'src/devices/schema/led.schema';
import { Fan } from 'src/devices/schema/fan.schema';
import { Waterpump } from 'src/devices/schema/waterpump.schema';
export declare class AdafruitService {
    private socketService;
    private sensorsService;
    private gardenModel;
    private ledModel;
    private fanModel;
    private waterpumpModel;
    constructor(socketService: SocketGatewayService, sensorsService: SensorsService, gardenModel: mongoose.Model<Garden>, ledModel: mongoose.Model<Led>, fanModel: mongoose.Model<Fan>, waterpumpModel: mongoose.Model<Waterpump>);
    private feed;
    subscribe(client: any, topic: string): void;
    public(client: any, topic: string, message: string): void;
    handleData(client: any, user: User, garden_id: GardenIdDto): Promise<void>;
}
