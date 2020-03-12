import { query } from '@/services/base';

export const qiankun = query().then(apps => ({
  apps,
}));
