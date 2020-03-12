<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# nestjs-base-instance
restful api server application

## 目录结构
```
nestjs-base-instance/
  |
  ├──src/
  │   │
  │   │──app/                   * 主程序
  │   │   │
  │   │   │──app.module.ts      * 主程序根模块，负责各业务模块的聚合
  │   │   │
  │   │   │──app.controller.ts  * 主程序根控制器
  │   │   │
  │   │   │──app.config.ts      * 主程序配置，数据库、等全局参数配置
  │   │   │
  │   │   │──app.environment.ts * 全局环境变量
  │   │
  │   │──common/                * 全局配置文件
  │   │
  │   │──****                   * 业务模块
  │   │
  │   └──main.ts                * 引入配置，启动主程序，引入各种全局服务
  │
  │──test/                      * 测试文件
  │
  └──package.json               * 包信息
```


## 接口概述
- HTTP 状态码
  - 400 请求不合法
  - 401 鉴权失败
  - 403 权限不足
  - 404 资源不存在
  - 405 无此方法
  - 500 服务器GG
  - 200 正常
  - 201 POST 正常

- 返回值说明
  - success:
    - false 异常
    - true 正常
  - message: 返回信息
  - result:
    - 列表数据: `{ pagenation: {...}, data: {...} }`
    - 详情数据: `{ name: '', title: '', content:... }`

## 开发命令

### Installation

```bash
$ npm install
```

### Running the mongo
```bash
$ docker-compose up -d
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## swagger
http://localhost:8000/api

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```