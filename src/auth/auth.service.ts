import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const {username, password} = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            username,
            password: hashedPassword
        })

        const token = this.jwtService.sign({id: user._id});
        return {token};
    }

    async login(loginDto: LoginDto): Promise<{token: string}> {
        const {username, password} = loginDto;
        const user = await this.userModel.findOne({username});
        if(!user) {
            console.log("Username doesn't exist")
            throw new UnauthorizedException("Invalid username or password !")
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) {
            console.log("Password is wrong")
            throw new UnauthorizedException("Invalid username or password !")
        }

        const token = this.jwtService.sign({id: user._id});
        return {token};
    }
}
