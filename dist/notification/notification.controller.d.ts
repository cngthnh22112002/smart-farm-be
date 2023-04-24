import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getTodayNotification(req: any): Promise<import("./schema/notification.schema").Notification[]>;
    getAllNotification(req: any, { limit }: {
        limit: string;
    }): Promise<import("./schema/notification.schema").Notification[]>;
    createNotification(req: any, notification: CreateNotificationDto): Promise<import("./schema/notification.schema").Notification>;
    deleteAllNotification(req: any): Promise<import("../user/schema/user.schema").User>;
}
