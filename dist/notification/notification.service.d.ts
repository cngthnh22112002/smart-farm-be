import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schema/notification.schema';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: mongoose.Model<Notification>);
    createNotification(user: User, notification: CreateNotificationDto): Promise<Notification>;
    deleteAllNotification(user: User): Promise<User>;
    getTodayNotification(user: User): Promise<Notification[]>;
    getAllNotification(user: User, limit: number): Promise<Notification[]>;
}
