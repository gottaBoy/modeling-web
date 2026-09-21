import { IDeLogicParams } from '../de-logic';
/**
 * @description 实体逻辑适配器接口
 * @export
 * @interface IDELogicProvider
 */
export interface IDELogicProvider {
    /**
     * @description 初始化
     * @returns {*}  {Promise<void>}
     * @memberof IDELogicProvider
     */
    init(): Promise<void>;
    /**
     * @description 执行实体逻辑
     * @param {IDeLogicParams} parameters 实体逻辑执行参数
     * @returns {*}  {Promise<unknown>}
     * @memberof IDELogicProvider
     */
    exec(parameters: IDeLogicParams): Promise<unknown>;
}
//# sourceMappingURL=i-de-logic.provider.d.ts.map