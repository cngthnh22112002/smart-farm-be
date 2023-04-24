import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schema/notification.schema';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name)
        private notificationModel: mongoose.Model<Notification>,
    ) {}

    async createNotification(user: User, notification: CreateNotificationDto): Promise<Notification> {
        const noti = await this.notificationModel.create(notification);
        user.notifications.push(noti._id);
        user.save();
        return noti.save();
    }

    async getTodayNotification(user: User): Promise<Notification[]> {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0); // set the time to 00:00:00.000
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999); // set the time to 23:59:59.999
      
        const todayNotifications = await this.notificationModel.aggregate([
          {
            $match: {
              userId: user._id.toString(),
              createdAt: { $gte: startOfToday, $lte: endOfToday },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              message: 1,
              createdAt: 1,
            },
          },
        ]);
      
        return todayNotifications;
    }

    async getAllNotification(user: User, limit: number): Promise<Notification[]> {
        const notifications = await this.notificationModel.aggregate([
            {
              $match: {
                userId: user._id.toString(),
              },
            },
            { $limit: limit },
            {
              $project: {
                _id: 1,
                title: 1,
                message: 1,
                createdAt: 1,
              },
            },
        ]);
        
        return notifications;
    }
}
