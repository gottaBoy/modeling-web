import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import { IAppDEService, IDEMethodCreateOptions, IDEMethodProvider } from '../../../../../interface';
import { Method } from '../method';
/**
 * 实体行为适配器
 * @author lxm
 * @date 2023-11-28 03:27:25
 * @export
 * @class DeActionDeMethodProvider
 * @implements {IDEMethodProvider}
 */
export declare class DeActionDeMethodProvider implements IDEMethodProvider {
    create(service: IAppDEService, entity: IAppDataEntity, method: IAppDEMethod, opts: IDEMethodCreateOptions): Method;
}
//# sourceMappingURL=de-action-de-method.provider.d.ts.map