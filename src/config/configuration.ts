import DevConfig from './config.development';
import ProdConfig from './config.production';
import LocalConfig from './config.local';

/**
 * config.{env}.ts must be return object
 */
export const ENV_CONFIG = {
  development: DevConfig,
  production: ProdConfig,
  local: LocalConfig,
};

/**
 * check dev env
 * @returns boolean true is dev
 */
export function isDev(): boolean {
  return (
    process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'
  );
}

export default () => ENV_CONFIG[process.env.NODE_ENV];
