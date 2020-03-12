/**
 * @Description: 全局配置参数
 * @Module: config
 * @Author: Daker
 * @Email: daker.zhou@gmail.com
 * @Github: https://github.com/daker-china
 * @Date: 2018-12-19 17:01:10
 * @LastEditTime: 2018-12-29 18:30:43
 */
import { argv } from 'yargs';
import { environment } from '@/app/app.environment'
import * as packages from '../../package.json';
 
export const APP = {
  PORT: 8000,
  ENVIRONMENT: environment
};

export const CROSS_DOMAIN = {
  allowedOrigins: ['https://daker.xin', 'https://admin.daker.xin'],
  allowedReferer: 'daker.xin',
};

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  tokenSecret: argv.auth_token_secret || 'daker-api',
  defaultUserName: argv.auth_username || 'daker-china',
  defaultPassWord: argv.auth_password || 'daker-china'
};

export const MONGODB = {
  uri: `mongodb://127.0.0.1:${argv.db_port || 27017}/`,
  username: argv.db_username || 'DB_username',
  password: argv.db_password || 'DB_password'
};

export const GITHUB = {
  username: 'daker-china',
};

export const INFO = {
  name: packages.name,
  version: packages.version,
  author: packages.author,
  site: packages.author.url,
  github: 'https://github.com/daker-china',
  powered: ['Vue', 'Nuxt.js', 'ReactNative', 'Nodejs', 'MongoDB', 'Koa2', 'Nginx', 'TypeScript']
};
