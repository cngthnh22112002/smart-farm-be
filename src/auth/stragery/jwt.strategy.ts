import { Injectable} from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/user/schema/user.schema";
import * as mongoose from 'mongoose';
import { UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: any) {
        const { id } = payload;
        const user = await this.userModel.findById(id);
        if(!user) {
            throw new UnauthorizedException("Please login first to access !")
        }
        return user;
    }
}