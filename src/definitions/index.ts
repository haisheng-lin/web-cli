export interface ZoroJSONConfig {
  name?: string; // 业务项目名称
  plugin?: string; // 使用的插件名称
  package?: 'npm' | 'yarn'; // 包管理方式
  path?: {
    output?: string; // 对于 webpack output
    pbulic?: string; // 对应 webpack publicPath
  };
  defineNamespace?: string;
  define?: { [p: string]: { [p: string]: string | number } };
  devServer?: {
    port?: number;
    https?: boolean;
    proxy?: object;
  };
  publish?: { [p: string]: { [p: string]: string | number } };
}

export interface PluginSourceRepository {
  pluginSource: string;
  pluginSourceUrl: string;
  pluginSourceGroup?: string;
}
