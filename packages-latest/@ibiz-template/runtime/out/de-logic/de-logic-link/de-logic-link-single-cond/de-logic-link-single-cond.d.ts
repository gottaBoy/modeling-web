import { IDELogicLinkSingleCond } from '@ibiz/model-core';
import { DELogicContext } from '../../de-logic-context';
import { DELogicLinkCond } from '../de-logic-link-cond/de-logic-link-cond';
import { IDeLogicLinkSingleCond } from '../../../interface';
/**
 * 界面逻辑连接条件项
 *
 * @author lxm
 * @date 2023-02-10 15:02:34
 * @export
 * @class DELogicLinkSingleCond
 * @extends {DELogicLinkCond}
 */
export declare class DELogicLinkSingleCond extends DELogicLinkCond implements IDeLogicLinkSingleCond {
    model: IDELogicLinkSingleCond;
    /**
     * 源参数
     *
     * @author lxm
     * @date 2023-02-15 18:02:51
     * @type {string}
     */
    readonly srcParam?: string;
    /**
     * 目标参数
     *
     * @author lxm
     * @date 2023-02-15 18:02:36
     * @type {string}
     */
    readonly dstParam: string;
    get dstField(): string;
    get op(): string;
    /**
     * 条件值类型
     * @author lxm
     * @date 2023-06-14 03:35:39
     * @readonly
     */
    get type(): string | undefined;
    /**
     * 条件值
     * @author lxm
     * @date 2023-06-14 03:36:45
     * @readonly
     */
    get value(): string | undefined;
    constructor(model: IDELogicLinkSingleCond);
    /**
     * 执行逻辑检测
     *
     * @author lxm
     * @date 2023-02-15 18:02:05
     * @param {DELogicContext} ctx
     * @param {IContext} context
     * @param {IData} data
     * @return {*}  {boolean}
     */
    test(ctx: DELogicContext, context: IContext, data: IData): boolean;
}
//# sourceMappingURL=de-logic-link-single-cond.d.ts.map