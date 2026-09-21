import { IAppCodeList, IDEGridFieldColumn, IUIActionGroupDetail } from '@ibiz/model-core';
import { CodeListItem, IApiGridFieldColumnController } from '../../../../../interface';
import { GridColumnController } from '../../grid/grid-column.controller';
import { GridRowState } from '../../grid/grid-row.state';
/**
 * @description 表格属性列控制器
 * @export
 * @class GridFieldColumnController
 * @extends {GridColumnController<IDEGridFieldColumn>}
 * @implements {IApiGridFieldColumnController}
 */
export declare class GridFieldColumnController extends GridColumnController<IDEGridFieldColumn> implements IApiGridFieldColumnController {
    /**
     * 代码表项
     *
     * @author lxm
     * @date 2022-09-28 16:09:51
     * @type {readonly}
     */
    codeListItems?: readonly CodeListItem[];
    /**
     * 代码表模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-05-24 10:55:50
     */
    codeList: IAppCodeList | undefined;
    /**
     * 是否是链接列
     *
     * @author lxm
     * @date 2022-09-28 17:09:15
     * @returns {*}
     */
    get isLinkColumn(): boolean;
    /**
     * 是否可触发界面行为
     *
     * @author lxm
     * @date 2022-12-08 14:12:37
     * @readonly
     * @type {boolean}
     */
    get hasAction(): boolean;
    /**
     * 属性列对应值在数据里的属性字段名称
     * @author lxm
     * @date 2023-06-25 09:26:04
     * @readonly
     */
    get fieldName(): string;
    /**
     * 单位
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof GridFieldColumnController
     */
    get unitName(): string | undefined;
    protected onInit(): Promise<void>;
    /**
     * 处理列过滤
     *
     * @param {unknown} value
     * @return {*}  {Promise<void>}
     * @memberof GridFieldColumnController
     */
    handleColumnScreen(value: unknown): Promise<void>;
    /**
     * 初始化列过滤
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof GridFieldColumnController
     */
    protected initColumnFilter(): Promise<void>;
    /**
     * 初始化属性列界面行为组按钮状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {GridRowState} row
     */
    initActionStates(row: GridRowState): void;
    /**
     * 行是否可点击（影响列的界面样式）
     *
     * @author lxm
     * @date 2022-12-08 15:12:58
     * @readonly
     */
    clickable(row: GridRowState): boolean;
    /**
     * 公共参数处理，计算上下文和视图参数
     * @return {*}
     * @author: zhujiamin
     * @Date: 2022-08-25 15:44:14
     */
    handlePublicParams(data: IData, context: IContext, params: IParams): {
        context: IContext;
        params: IParams;
    };
    /**
     * 打开链接视图
     *
     * @author lxm
     * @date 2022-09-28 18:09:14
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 原生事件
     * @returns {*}  {Promise<void>}
     */
    openLinkView(row: GridRowState, event: MouseEvent): Promise<void>;
    /**
     * 触发表格列附加界面行为
     *
     * @author lxm
     * @date 2022-12-08 15:12:35
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 鼠标事件
     * @returns {*}  {Promise<void>}
     */
    triggerAction(row: GridRowState, event: MouseEvent): Promise<void>;
    /**
     * 加载代码表数据
     *
     * @author lxm
     * @date 2022-09-28 15:09:38
     * @returns {*}
     */
    loadCodeList(): Promise<Readonly<CodeListItem[]> | undefined>;
    /**
     * 计算聚合属性列的值
     * 无配置返回undefined
     * @author lxm
     * @date 2023-08-07 04:50:47
     * @param {IData[]} items
     * @return {*}  {(string | undefined)}
     */
    calcFieldAgg(items: IData[]): string | undefined;
    /**
     * 值格式化
     * @author lxm
     * @date 2023-08-25 05:18:11
     * @param {unknown} value
     * @return {*}  {string}
     */
    formatValue(value?: unknown): string;
    /**
     * 触发界面行为组点击事件
     *
     * @author zk
     * @date 2023-12-15 11:12:01
     * @param {IUIActionGroupDetail} detail 界面行为组成员
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 鼠标事件
     * @return {*}  {Promise<void>}
     * @memberof GridFieldColumnController
     */
    onActionClick(detail: IUIActionGroupDetail, row: GridRowState, event: MouseEvent): Promise<void>;
}
//# sourceMappingURL=grid-field-column.controller.d.ts.map