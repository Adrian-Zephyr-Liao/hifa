declare module 'hifa:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'hifa:pages' {
  import { RouteRecordRaw } from 'vue-router';
  export const routes: RouteRecordRaw[];
}
