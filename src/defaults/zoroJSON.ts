import { ZoroJSONConfig } from '@definitions';

const defaultZoroJSON: ZoroJSONConfig = {
  package: 'npm',
  path: {
    output: 'dist',
    pbulic: '/',
  },
  define: {},
  publish: {},
  devServer: {
    port: 3000,
    https: false,
  },
};

export default defaultZoroJSON;
