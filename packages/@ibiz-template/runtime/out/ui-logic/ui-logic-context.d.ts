import { IUILogicContext, IUILogicParams, IViewController } from '../interface';
import { UILogicParam } from './ui-logic-param/ui-logic-param';
/**
 * 界面逻辑执行上下文
 *
 * @author chitanda
 * @date 2023-02-08 17:02:14
 * @export
 * @class UILogicContext
 */
export declare class UILogicContext implements IUILogicContext {
    private deLogicParams;
    parameters: IUILogicParams;
    /**
     * 上一次返回值
     * @author lxm
     * @date 2023-09-04 09:22:52
     * @type {unknown}
     */
    lastReturn: unknown;
    /**
     * 逻辑操作的会话变量
     * @author lxm
     * @date 2024-04-07 11:55:01
     * @type {IParams}
     */
    session: IParams;
    /**
     * 视图控制器
     *
     * @author chitanda
     * @date 2023-12-01 11:12:48
     * @readonly
     * @type {IViewController}
     */
    get view(): IViewController;
    /**
     * 上下文
     */
    get context(): IContext;
    /**
     * 数据
     */
    get data(): IData;
    /**
     * 视图参数
     */
    get viewParam(): IParams;
    /**
     * Creates an instance of UILogicContext.
     * @author lxm
     * @date 2023-06-14 07:36:42
     * @param {Map<string, UILogicParam>} deLogicParams 实体逻辑参数集合
     * @param {IUILogicParams} parameters 界面逻辑执行参数
     */
    constructor(deLogicParams: Map<string, UILogicParam>, parameters: IUILogicParams);
    /**
     * 界面逻辑参数
     *
     * @description 界面逻辑参数初始化时设置
     * @author chitanda
     * @date 2023-02-08 17:02:38
     * @type {Record<string, any>}
     */
    params: Record<string, any>;
    /**
     * UI逻辑执行返回值
     *
     * @author chitanda
     * @date 2023-02-09 21:02:40
     * @type {unknown}
     */
    result: unknown;
    /**
     * 是否存在结束节点
     *
     * @author chitanda
     * @date 2023-03-16 18:03:09
     * @type {boolean}
     */
    isEndNode: boolean;
    /**
     * 默认参数节点
     *
     * @default 'Default'
     * @author chitanda
     * @date 2023-03-16 18:03:39
     * @type {string}
     */
    defaultParamName: string;
    /**
     * 重置实体逻辑参数
     *
     * @author lxm
     * @date 2023-03-24 09:18:02
     * @param {string} name
     */
    resetParam(name: string): void;
    /**
     * 重新建立变量
     *
     * @author lxm
     * @date 2023-03-24 09:20:24
     * @param {string} name
     */
    renewParam(name: string): void;
    /**
     * 设置上一次返回值
     *
     * @author lxm
     * @date 2023-09-04 09:23:52
     * @param {unknown} value
     */
    setLastReturn(value: unknown): void;
    /**
     * 初始化上一次返回参数类型的逻辑参数
     *
     * @author lxm
     * @date 2023-09-04 09:52:00
     * @param {string} tag
     */
    initLastReturnParam(tag: string): void;
    /**
     * 是否是实体参数变量（即后台数据对象）
     *
     * @author lxm
     * @date 2023-09-22 03:40:30
     * @param {string} paramId
     * @return {*}  {boolean}
     */
    isEntityParam(paramId: string): boolean;
}
//# sourceMappingURL=ui-logic-context.d.ts.map