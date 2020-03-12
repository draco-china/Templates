import { Model, PassportLocalModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: PassportLocalModel<User>) { }
  async findAll(): Promise<User[]> {
    return await this.userModel.find({}, '-_id -__v -password').exec();
  }

  async findOne(options: object): Promise<User | null> {
    return await this.userModel.findOne(options, '-_id -__v -password').exec();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(id: number, User: User): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user._id) {
      debug('user not found');
    }

    await this.userModel.findByIdAndUpdate(id, User).exec();
    return await this.userModel.findById(id).exec();
  }
  async delete(id: number): Promise<string> {
    try {
      await this.userModel.findByIdAndRemove(id).exec();
      return 'The user has been deleted';
    }
    catch (err) {
      debug(err);
      return 'The user could not be deleted';
    }
  }
}