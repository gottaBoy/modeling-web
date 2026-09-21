import { IAppDataEntity, IAppDEMethod } from '@ibiz/model-core';
import { IAppDEService, IDEMethodCreateOptions, IDEMethodProvider } from '../../../../../interface';
import { Method } from '../method';
/**
 * 集合适配器
 * @author lxm
 * @date 2023-11-28 03:27:25
 * @export
 * @class FetchDeMethodProvider
 * @implements {IDEMethodProvider}
 */
export declare class FetchDeMethodProvider implements IDEMethodProvider {
    create(service: IAppDEService, entity: IAppDataEntity, method: IAppDEMethod, opts: IDEMethodCreateOptions): Method;
}
//# sourceMappingURL=fetch-de-method.provider.d.ts.map