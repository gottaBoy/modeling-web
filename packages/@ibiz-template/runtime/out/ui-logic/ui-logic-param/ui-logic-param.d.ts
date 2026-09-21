import { IDEUILogicParam } from '@ibiz/model-core';
import { UILogicContext } from '../ui-logic-context';
/**
 * 界面逻辑参数
 *
 * @author chitanda
 * @date 2023-02-07 21:02:45
 * @export
 * @class UILogicParam
 */
export declare class UILogicParam {
    model: IDEUILogicParam;
    /**
     * Creates an instance of UILogicParam.
     *
     * @author chitanda
     * @date 2023-02-08 16:02:22
     * @param {UILogicParamModel} model
     */
    constructor(model: IDEUILogicParam);
    /**
     * 向界面逻辑中计算基础参数
     *
     * @author chitanda
     * @date 2023-02-08 20:02:33
     * @param {UILogicContext} ctx
     */
    calc(ctx: UILogicContext): void;
    /**
     * 重新建立变量
     * @author lxm
     * @date 2023-03-24 09:20:42
     * @param {DELogicContext} ctx
     */
    renew(ctx: UILogicContext): void;
}
//# sourceMappingURL=ui-logic-param.d.ts.map