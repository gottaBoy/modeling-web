import { IDELogicLinkSingleCond } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicLinkCond } from '../ui-logic-link-cond/ui-logic-link-cond';
/**
 * 界面逻辑连接条件项
 *
 * @author chitanda
 * @date 2023-02-10 15:02:34
 * @export
 * @class UILogicLinkSingleCond
 * @extends {UILogicLinkCond}
 */
export declare class UILogicLinkSingleCond extends UILogicLinkCond {
    model: IDELogicLinkSingleCond;
    /**
     * 源参数
     *
     * @author chitanda
     * @date 2023-02-15 18:02:51
     * @type {string}
     */
    readonly srcParam?: string;
    /**
     * 目标参数
     *
     * @author chitanda
     * @date 2023-02-15 18:02:36
     * @type {string}
     */
    readonly dstParam: string;
    get dstField(): string;
    get op(): string;
    get type(): string | undefined;
    get value(): string | undefined;
    constructor(model: IDELogicLinkSingleCond);
    /**
     * 执行逻辑检测
     *
     * @author chitanda
     * @date 2023-02-15 18:02:05
     * @param {UILogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {boolean}
     */
    test(ctx: UILogicContext, context: IContext, data: IData): boolean;
}
//# sourceMappingURL=ui-logic-link-single-cond.d.ts.map