import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult, IUILogicParams } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
/**
 * 系统预置界面行为适配器
 *
 * @author lxm
 * @date 2022-10-25 15:10:51
 * @export
 * @class SysUIActionProvider
 * @implements {IUIActionProvider}
 */
export declare class SysUIActionProvider extends UIActionProviderBase {
    private predefinedActionMap;
    execAction(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
}
//# sourceMappingURL=sys-ui-action-provider.d.ts.map