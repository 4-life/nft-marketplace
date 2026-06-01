import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: true,
  routeDiscovery: { mode: 'initial' },
  async prerender() {
    return ['/', '/metaverse'];
  },
} satisfies Config;
