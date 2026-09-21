import { AppDECounter } from './app-de-counter';
/**
 * 应用实体计数器
 * @author lxm
 * @date 2023-08-24 12:08:24
 * @export
 * @class AppDECounterProvider
 * @implements {IAppCounterProvider}
 */
export class AppDECounterProvider {
    createCounter(model) {
        return new AppDECounter(model);
    }
}
