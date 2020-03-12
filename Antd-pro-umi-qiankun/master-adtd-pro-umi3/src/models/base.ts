/*
 * @Description: your description
 * @Module: module.name
 * @Author: Draco
 * @Email: Draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2020-03-06 15:20:18
 * @LastEditTime: 2020-03-06 15:20:18
 */
/* eslint-disable import/no-extraneous-dependencies */
import { Reducer } from 'redux';
import { Effect, IRoute, qiankunStart } from 'umi';
import { query } from '@/services/base';

// function sleep(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export interface App extends Partial<IRoute> {
  name: string; // hack
  entry: string;
  base: string;
  mountElementId: string;
}

export interface BaseModelState {
  name: 'Qiankun';
  apps: App[];
}

export interface BaseModelType {
  namespace: 'base';
  state: BaseModelState;
  effects: {
    [key: string]: Effect;
  };
  reducers: {
    [key: string]: Reducer<BaseModelState>;
  };
}

const BaseModel: BaseModelType = {
  namespace: 'base',

  state: {
    name: 'Qiankun',
    apps: [],
  },

  effects: {
    *getApps(_, { put }) {
      /*
       子应用配置信息获取分同步、异步两种方式
       同步有两种配置方式，1、app.js导出qiankun对象，2、配置写在umi配置文件中，可通过import @tmp/subAppsConfig获取
      */
      // console.log('waiting for qiankun start');
      // yield sleep(1000);

      const apps = yield query();
      yield put({
        type: 'save',
        payload: {
          apps,
        },
      });

      yield setTimeout(qiankunStart, 200);
    },
  },

  reducers: {
    save(state = { name: 'Qiankun', apps: [] }, { payload }) {
      return {
        ...state,
        apps: payload.apps,
      };
    },
  },
};

export default BaseModel;
