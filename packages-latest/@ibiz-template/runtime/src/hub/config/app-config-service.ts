import { IAppConfigService } from '../../interface';
import { AppViewConfigService } from './app-view-config-service';

/**
 * 应用设置服务
 *
 * @author lxm
 * @date 2023-07-03 07:07:47
 * @export
 * @class AppConfigService
 */
export class AppConfigService implements IAppConfigService {
  view = new AppViewConfigService();
}
