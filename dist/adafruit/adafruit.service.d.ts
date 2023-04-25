import { SocketGatewayService } from 'src/socket_gateway/socket_gateway.service';
import { User } from 'src/user/schema/user.schema';
import { SensorsService } from 'src/sensors/sensors.service';
import { GardenIdDto } from 'src/garden/dto/gardenId.dto';
import { Garden } from 'src/garden/schema/garden.schema';
import mongoose from 'mongoose';
import { ShareService } from 'src/share/share.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class AdafruitService {
    private socketService;
    private sensorsService;
    private shareService;
    private notificationService;
    private gardenModel;
    constructor(socketService: SocketGatewayService, sensorsService: SensorsService, shareService: ShareService, notificationService: NotificationService, gardenModel: mongoose.Model<Garden>);
    private feed;
    subscribe(client: any, topic: string): void;
    disconnect(client: any): void;
    publish(client: any, topic: string, message: string): void;
    handleData(client: any, user: User, garden_id: GardenIdDto): Promise<void>;
}
