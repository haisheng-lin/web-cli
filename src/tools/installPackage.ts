import { execSync } from 'child_process';

export function installPackageSync(packageType: string = 'npm', options?: any) {
  const extra = packageType === 'yarn' ? ' --production=false' : '';
  execSync(packageType + ' install' + extra, options);
}
