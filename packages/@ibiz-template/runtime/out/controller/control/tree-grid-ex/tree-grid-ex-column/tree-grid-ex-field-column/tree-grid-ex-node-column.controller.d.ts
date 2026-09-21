import { IAppCodeList, IDETreeNode, IDETreeNodeDataItem, IDETreeNodeEditItem, IDETreeNodeFieldColumn, IUIActionGroupDetail } from '@ibiz/model-core';
import { CodeListItem, IEditorContainerController, IEditorController, IEditorProvider, ITreeGridExRowState } from '../../../../../interface';
import { TreeGridExFieldColumnController } from './tree-grid-ex-field-column.controller';
import { TreeGridExController } from '../../tree-grid-ex.controller';
import { TreeGridExNotifyState } from '../../../../constant';
import { TreeGridExRowState } from '../../tree-grid-ex-row.state';
/**
 * 树表格的某一个属性列对应某一种实体节点的节点数据的控制器
 * @author lxm
 * @date 2024-01-09 10:07:02
 * @export
 * @class TreeGridExNodeColumnController
 * @implements {IEditorContainerController}
 */
export declare class TreeGridExNodeColumnController implements IEditorContainerController {
    fieldColumn: TreeGridExFieldColumnController;
    nodeModel: IDETreeNode;
    /**
     * 树节点表格列（必有，没有不会创建该控制器）
     * @author lxm
     * @date 2024-01-09 10:08:17
     * @type {IDETreeNodeFieldColumn}
     */
    nodeColumn: IDETreeNodeFieldColumn;
    /**
     * 节点数据项
     * @author lxm
     * @date 2024-01-09 10:08:28
     * @type {IDETreeNodeDataItem}
     */
    nodeDataItem: IDETreeNodeDataItem;
    /**
     * 节点编辑项(启用了行编辑才有)
     * @author lxm
     * @date 2024-01-09 10:09:15
     * @type {IDETreeNodeEditItem}
     */
    nodeEditItem?: IDETreeNodeEditItem;
    /**
     * 编辑器适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {EditorController}
     */
    editorProvider?: IEditorProvider;
    /**
     * 编辑器控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:42
     * @type {IEditorController}
     */
    editor?: IEditorController;
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
    get unitName(): string | undefined;
    get valueFormat(): string | undefined;
    get context(): IContext;
    get params(): IParams;
    get dataType(): number | undefined;
    /**
     * 树表格列标识（用于取数和各种比较判断）
     * @author lxm
     * @date 2024-01-09 11:33:37
     * @readonly
     * @type {string}
     */
    get name(): string;
    /**
     *树表格增强部件
     * @author lxm
     * @date 2024-01-10 11:49:23
     * @readonly
     * @type {TreeGridExController}
     */
    get treeGrid(): TreeGridExController;
    /**
     * 是否是链接列
     *
     * @author lxm
     * @date 2022-09-28 17:09:15
     * @returns {*}
     */
    get isLinkColumn(): boolean;
    /**
     * 是否有触发界面行为
     *
     * @author lxm
     * @date 2022-12-08 14:12:37
     * @readonly
     * @type {boolean}
     */
    get hasClickAction(): boolean;
    /**
     * @author lxm
     * @date 2024-01-09 10:04:05
     * @param {TreeGridExFieldColumnController} fieldColumn 树表格属性列控制器
     * @param {IDETreeNode} nodeModel 对应实体节点模型
     */
    constructor(fieldColumn: TreeGridExFieldColumnController, nodeModel: IDETreeNode);
    /**
     * 初始化
     * @author lxm
     * @date 2024-01-09 10:02:16
     * @return {*}  {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * 初始化属性列界面行为组按钮状态
     *
     * @author lxm
     * @date 2022-09-07 21:09:43
     * @param {GridRowState} row
     */
    initActionStates(row: ITreeGridExRowState): void;
    /**
     * 文本点击事件
     *
     * @author zk
     * @date 2023-07-13 12:07:53
     * @param {MouseEvent} event
     */
    onTextClick(row: ITreeGridExRowState, event: MouseEvent): void;
    /**
     * 打开链接视图
     *
     * @author lxm
     * @date 2024-01-09 02:45:34
     * @param {ITreeGridExRowState} row
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    openLinkView(row: ITreeGridExRowState, event: MouseEvent): Promise<void>;
    /**
     * 触发表格列附加界面行为
     *
     * @author lxm
     * @date 2022-12-08 15:12:35
     * @param {GridRowState} row 行数据
     * @param {MouseEvent} event 鼠标事件
     * @returns {*}  {Promise<void>}
     */
    triggerAction(row: ITreeGridExRowState, event: MouseEvent): Promise<void>;
    /**
     * 触发界面行为组点击事件
     *
     * @author lxm
     * @date 2024-01-11 02:26:12
     * @param {IUIActionGroupDetail} detail
     * @param {ITreeGridExRowState} row
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    onActionClick(detail: IUIActionGroupDetail, row: ITreeGridExRowState, event: MouseEvent): Promise<void>;
    /**
     * 值格式化
     * @author lxm
     * @date 2024-01-09 03:37:34
     * @param {unknown} [value='']
     * @return {*}  {string}
     */
    formatValue(value?: unknown): string;
    /**
     * 加载代码表数据
     *
     * @author lxm
     * @date 2022-09-28 15:09:38
     * @returns {*}
     */
    loadCodeList(): Promise<Readonly<CodeListItem[]> | undefined>;
    gridStateNotify(row: TreeGridExRowState, state: TreeGridExNotifyState): void;
    /**
     * 设置行属性的值
     *
     * @author lxm
     * @date 2022-08-24 10:08:40
     * @param {GridRowState} row 行状态控制器
     * @param {unknown} value 要设置的值
     * @param {string} name 要设置的表单数据的属性名称
     * @param {boolean} ignore 忽略脏值检查
     */
    setRowValue(row: TreeGridExRowState, value: unknown, name?: string, ignore?: boolean): Promise<void>;
}
//# sourceMappingURL=tree-grid-ex-node-column.controller.d.ts.map