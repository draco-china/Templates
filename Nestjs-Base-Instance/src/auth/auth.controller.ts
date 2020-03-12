import { Controller, UseGuards, HttpStatus, Response, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/createUser.dto';
import { LoginUserDto } from '@/users/dto/loginUser.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('signup')
  public async signUp(@Response() res, @Body() user: CreateUserDto) {
    const result = await this.usersService.create(user);
    if (!result) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('signin')
  public async signIn(@Response() res, @Body() user: LoginUserDto){
    return await this.usersService.findOne({ username: user.username, password: user.password }).then(result => {
      if (!result) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: '用户名或密码错误，登录失败',
          success: false,
        });
      } else {
        console.log('start getting the token');
        const token = this.authService.createToken(user);
        return res
          .status(HttpStatus.OK)
          .header('Authorization', `Bearer ${token}`)
          .json({
            message: '登录成功',
            success: true,
            result
          });
      }
    });
  }
}
