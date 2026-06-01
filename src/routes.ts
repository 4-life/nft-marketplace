import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('components/Layout/index.tsx', [
    index('pages/market/index.tsx'),
    route('metaverse', 'pages/metaverse/index.tsx'),
  ]),
] satisfies RouteConfig;
