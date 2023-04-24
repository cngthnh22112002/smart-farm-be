import { Injectable } from '@nestjs/common';
import { AVGDay } from './schema/day/avg-day.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AVGMonth } from './schema/month/avg-month.schema';

@Injectable()
export class ReportService {
    constructor(
    ) {}

}
