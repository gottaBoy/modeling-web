import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult, IUILogicParams } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
/**
 * 系统登出界面行为适配器
 *
 * @author zk
 * @date 2023-12-11 07:12:49
 * @export
 * @class LoginOutUIActionProvider
 * @extends {UIActionProviderBase}
 */
export declare class LoginOutUIActionProvider extends UIActionProviderBase {
    execAction(_action: IAppDEUIAction, _params: IUILogicParams): Promise<IUIActionResult>;
}
//# sourceMappingURL=loginout-ui-action-provider.d.ts.map