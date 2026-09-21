import { IAppDEUIAction } from '@ibiz/model-core';
import { IUILogicParams, IUIActionResult } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
/**
 * 后台调用界面行为适配器
 *
 * @author lxm
 * @date 2022-10-25 15:10:51
 * @export
 * @class BackendUIActionProvider
 * @implements {IUIActionProvider}
 */
export declare class BackendUIActionProvider extends UIActionProviderBase {
    execAction(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
}
//# sourceMappingURL=backend-ui-action-provider.d.ts.map