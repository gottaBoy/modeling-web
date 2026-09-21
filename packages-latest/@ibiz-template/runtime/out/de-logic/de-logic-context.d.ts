import { DELogicParam } from './de-logic-param/de-logic-param';
import { IDeLogicContext, IDeLogicParams } from '../interface';
/**
 * 实体逻辑执行上下文
 *
 * @author lxm
 * @date 2023-03-09 07:38:38
 * @export
 * @class DELogicContext
 */
export declare class DELogicContext implements IDeLogicContext {
    private deLogicParams;
    parameters: IDeLogicParams;
    /**
     * 上一次返回值
     * @author lxm
     * @date 2023-09-04 09:22:52
     * @type {unknown}
     */
    lastReturn: unknown;
    /**
     * 上下文
     */
    get context(): IContext;
    /**
     * 数据
     */
    get data(): IData[];
    /**
     * 视图参数
     */
    get viewParam(): IParams;
    /**
     * Creates an instance of DELogicContext.
     * @author lxm
     * @date 2023-03-24 09:15:14
     * @param {Map<string, DELogicParam>} deLogicParams 实体逻辑参数集合
     * @param {IContext} context 上下文
     * @param {IData} data 数据对象
     * @param {IParams} params 视图参数
     */
    constructor(deLogicParams: Map<string, DELogicParam>, parameters: IDeLogicParams);
    /**
     * 重置实体逻辑参数
     * @author lxm
     * @date 2023-03-24 09:18:02
     * @param {string} name
     */
    resetParam(name: string): void;
    /**
     * 重新建立变量
     * @author lxm
     * @date 2023-03-24 09:20:24
     * @param {string} name
     */
    renewParam(name: string): void;
    /**
     * 实体逻辑参数
     *
     * @description 实体逻辑参数初始化时设置
     * @author lxm
     * @date 2023-02-08 17:02:38
     * @type {Record<string, any>}
     */
    params: Record<string, any>;
    /**
     * UI逻辑执行返回值
     *
     * @author lxm
     * @date 2023-02-09 21:02:40
     * @type {unknown}
     */
    result: unknown;
    /**
     * 是否存在结束节点
     *
     * @author lxm
     * @date 2023-03-16 12:08:58
     * @type {boolean}
     */
    isEndNode: boolean;
    /**
     * 默认参数节点
     *
     * @author lxm
     * @date 2023-03-16 12:11:14
     * @type {string}
     */
    defaultParamName: string;
    /**
     * 设置上一次返回值
     * @author lxm
     * @date 2023-09-04 09:23:52
     * @param {unknown} value
     */
    setLastReturn(value: unknown): void;
    /**
     * 初始化上一次返回参数类型的逻辑参数
     * @author lxm
     * @date 2023-09-04 09:52:00
     * @param {string} tag
     */
    initLastReturnParam(tag: string): void;
    /**
     * 是否是实体参数变量（即后台数据对象）
     * @author lxm
     * @date 2023-09-22 03:40:30
     * @param {string} paramId
     * @return {*}  {boolean}
     */
    isEntityParam(paramId: string): boolean;
}
//# sourceMappingURL=de-logic-context.d.ts.map