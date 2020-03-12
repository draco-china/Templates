import request from '@/utils/request';

const CONFIG_FILE_PATH = REACT_APP_ENV === 'dev' ? 'apps.conf.dev.json' : 'apps.conf.json';

export async function query() {
  return request(`/config/${CONFIG_FILE_PATH}`);
}
