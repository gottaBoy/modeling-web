import { IAppCounter } from '@ibiz/model-core';
import { IAppCounterProvider } from '../../../interface';
import { AppCounter } from './app-counter';
/**
 * 应用实体计数器
 * @author lxm
 * @date 2023-08-24 12:08:24
 * @export
 * @class AppDECounterProvider
 * @implements {IAppCounterProvider}
 */
export declare class AppDECounterProvider implements IAppCounterProvider {
    createCounter(model: IAppCounter): AppCounter;
}
//# sourceMappingURL=app-de-counter.provider.d.ts.map