import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  // 用户名
  username: {
    type: String,
    trim: true,
    required: 'UserName is required'
  },

  // 密码
  password: {
    type: String,
    trim: true,
    required: 'Password is required'
  },

  // 邮箱
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [ /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, 'invalid email' ]
  },

  // 签名
  slogan: {
    type: String,
    trim: true,
    default: ''
  },

  // 头像
  gravatar: {
    type: String,
    trim: true,
    default: ''
  },

  // 扩展属性
  extends: [{
    name: {type: String, validate: /\S+/},
    value: {type: String, validate: /\S+/}
  }]
});


