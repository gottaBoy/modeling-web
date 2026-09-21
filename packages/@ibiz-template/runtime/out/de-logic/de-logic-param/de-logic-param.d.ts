import { IDELogicParam } from '@ibiz/model-core';
import { DELogicContext } from '../de-logic-context';
/**
 * 界面逻辑参数
 *
 * @author lxm
 * @date 2023-02-07 21:02:45
 * @export
 * @class DELogicParam
 */
export declare class DELogicParam {
    model: IDELogicParam;
    /**
     * Creates an instance of DELogicParam.
     *
     * @author lxm
     * @date 2023-02-08 16:02:22
     * @param {DELogicParamModel} model
     */
    constructor(model: IDELogicParam);
    /**
     * 向界面逻辑中计算基础参数
     *
     * @author lxm
     * @date 2023-02-08 20:02:33
     * @param {DELogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @param {IParams} [opt]
     */
    calc(ctx: DELogicContext): void;
    /**
     * 重新建立变量
     * @author lxm
     * @date 2023-03-24 09:20:42
     * @param {DELogicContext} ctx
     */
    renew(ctx: DELogicContext): void;
}
//# sourceMappingURL=de-logic-param.d.ts.map