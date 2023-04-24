import { Body, Controller, Delete, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(
        private notificationService: NotificationService
    ) {}

    @UseGuards(AuthGuard())
    @Get('today')
    async getTodayNotification(@Request() req:any) {
        return this.notificationService.getTodayNotification(req.user);
    }

    @UseGuards(AuthGuard())
    @Get('all')
    async getAllNotification(@Request() req:any, @Query() { limit }: { limit: string }) {
        return await this.notificationService.getAllNotification(req.user, parseInt(limit));
    }

    @UseGuards(AuthGuard())
    @Post()
    async createNotification(@Request() req:any, @Body() notification: CreateNotificationDto) {
        return await this.notificationService.createNotification(req.user, notification);
    }

    @UseGuards(AuthGuard())
    @Delete('all')
    async deleteAllNotification(@Request() req:any) {
        return await this.notificationService.deleteAllNotification(req.user);
    }
}
