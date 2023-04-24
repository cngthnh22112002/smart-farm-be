"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_schema_1 = require("./schema/notification.schema");
let NotificationService = class NotificationService {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async createNotification(user, notification) {
        const newNoti = Object.assign(Object.assign({}, notification), { userId: user._id });
        const noti = await this.notificationModel.create(newNoti);
        user.notifications.push(noti._id);
        user.save();
        return noti.save();
    }
    async deleteAllNotification(user) {
        user.notifications.splice(0, user.notifications.length);
        await this.notificationModel.deleteMany({ userId: user._id });
        return user.save();
    }
    async getTodayNotification(user) {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        const todayNotifications = await this.notificationModel.aggregate([
            {
                $match: {
                    userId: user._id,
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
    async getAllNotification(user, limit) {
        const notifications = await this.notificationModel.aggregate([
            {
                $match: {
                    userId: user._id,
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
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map