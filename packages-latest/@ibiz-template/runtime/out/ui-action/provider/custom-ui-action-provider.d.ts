import { IAppDEUIAction } from '@ibiz/model-core';
import { IUILogicParams, IUIActionResult } from '../../interface';
import { UIActionProviderBase } from './ui-action-provider-base';
export declare class CustomUIActionProvider extends UIActionProviderBase {
    execAction(action: IAppDEUIAction, args: IUILogicParams): Promise<IUIActionResult>;
}
//# sourceMappingURL=custom-ui-action-provider.d.ts.map