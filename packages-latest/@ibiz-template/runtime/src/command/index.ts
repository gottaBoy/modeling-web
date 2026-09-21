import { AppFuncCommand } from './app/app-func/app-func';
import { OpenAppViewCommand } from './app/open-app-view/open-app-view';

/**
 * 安装指令
 *
 * @author chitanda
 * @date 2022-07-25 10:07:19
 * @export
 */
export function installCommand(): void {
  new AppFuncCommand();
  new OpenAppViewCommand();
}

export { AppFuncCommand, OpenAppViewCommand };
