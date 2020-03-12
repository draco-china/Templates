import { Document } from 'mongoose';

export interface User extends Document {
  // 用户名
  readonly username: String;

  // 密码
  readonly password: String;

  // 签名
  readonly slogan: String;

  // 头像
  readonly gravatar: String;

  // 扩展属性
  readonly extends: Array<Object>;
}
