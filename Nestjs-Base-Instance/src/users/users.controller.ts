import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete, Headers } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
// import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './interface/user.interface'

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Response() res, @Headers('Authorization') Authorization: string): Promise<User[]> {
    const result = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(result);
  }
}

