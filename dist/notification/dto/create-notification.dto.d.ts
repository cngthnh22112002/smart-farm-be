import { Types } from 'mongoose';
export declare class CreateNotificationDto {
    userId: Types.ObjectId;
    title: string;
    message: string;
    isRead: Boolean;
    createdAt: Date;
}
