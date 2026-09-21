import { IAppDEUIAction } from '@ibiz/model-core';
import { IUIActionResult, IUILogicParams } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
/**
 * 工作流流程撤回界面行为适配器
 *
 * @author lxm
 * @date 2022-10-25 15:10:51
 * @export
 * @class WFWithdrawUIActionProvider
 * @implements {IUIActionProvider}
 */
export declare class WFWithdrawUIActionProvider extends UIActionProviderBase {
    execAction(_action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
}
//# sourceMappingURL=wf-withdraw-ui-action-provider.d.ts.map