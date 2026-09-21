import { IApiContext, IApiParams } from '@ibiz-template/core';
import { IApiEnforceableController } from './i-api-enforceable.controller';
/**
 * @primary
 * @description 视图，部件控制器基类
 * @export
 * @interface IApiController
 * @extends {IApiEnforceableController}
 * @template T
 * @template S
 */
export interface IApiController<T extends object = object, S extends object = object> extends IApiEnforceableController {
    /**
     * @description 控制器实例的唯一标识,创建时自动生成
     * @type {string}
     * @memberof IApiController
     */
    readonly id: string;
    /**
     * @description 状态对象
     * @type {S}
     * @memberof IApiController
     */
    state: S;
    /**
     * @description 模型对象
     * @type {T}
     * @memberof IApiController
     */
    readonly model: T;
    /**
     * @description 应用上下文对象
     * @type {IApiContext}
     * @memberof IApiController
     */
    readonly context: IApiContext;
    /**
     * @description 视图参数对象
     * @type {IApiParams}
     * @memberof IApiController
     */
    readonly params: IApiParams;
}
//# sourceMappingURL=i-api.controller.d.ts.map