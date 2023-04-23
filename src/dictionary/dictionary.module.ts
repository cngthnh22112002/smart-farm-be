import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dictionary, DictionarySchema } from './schema/dictionary.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Dictionary.name, schema: DictionarySchema }])
  ],
  providers: [DictionaryService],
  controllers: [DictionaryController]
})
export class DictionaryModule {}
