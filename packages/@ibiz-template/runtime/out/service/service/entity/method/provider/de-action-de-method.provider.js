import { DEActionMethod } from '../de-action';
/**
 * 实体行为适配器
 * @author lxm
 * @date 2023-11-28 03:27:25
 * @export
 * @class DeActionDeMethodProvider
 * @implements {IDEMethodProvider}
 */
export class DeActionDeMethodProvider {
    create(service, entity, method, opts) {
        return new DEActionMethod(service, entity, method, opts.localMode);
    }
}
