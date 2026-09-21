import { IDETreeGridEx } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiTreeNodeData, IApiTreeGridExState, IApiTreeGridExRowState } from '../../state';
import { IApiTreeController } from './i-api-tree.controller';
import { IApiTreeGridExColumnController } from './tree-grid-ex-column';
/**
 * 树表格(增强)
 * @description 实现可折叠树形表格组件，支持节点数据懒加载、列宽拖拽调整、行双击事件触发、多条件排序及行选中高亮，提升数据浏览与操作效率。
 * @primary
 * @export
 * @interface IApiTreeGridEXController
 * @extends {IApiGridController<T, S>}
 * @ctrlparams {"name":"overflowmode","title":"超出呈现模式","parameterType":"'ellipsis' | 'wrap'","defaultvalue":"'wrap'","description":"单元格内容超出单元格宽度时的呈现模式，包含超出省略 'ellipsis'，换行 'wrap' 两种模式"}
 * @ctrlparams {name:emptyhiddenunit,title:无值隐藏,parameterType:boolean,defaultvalue:true,description:单元格无值时，其对应的值单位（如'天'、'%'等）是否隐藏}
 * @ctrlparams {"name":"editshowmode","title":"行编辑显示模式","parameterType":"'row' | 'cell' | 'all'","defaultvalue":"'row'","description":"表格进行行编辑时的呈现模式，包含单行编辑模式 'row'，单元格编辑 'cell' 模式，整个表格编辑模式 'all' 三种模式"}
 * @ctrlparams {"name":"editsavemode","title":"行编辑保存模式","parameterType":"'cell-blur' | 'auto' | 'manual'","defaultvalue":"'cell-blur'","description":"处理表格进行行编辑时的保存模式，包含单元格失焦 'cell-blur' 时保存，自动保存 'auto'，手动确认 'manual' 三种模式"}
 * @template T
 * @template S
 */
export interface IApiTreeGridEXController<T extends IDETreeGridEx = IDETreeGridEx, S extends IApiTreeGridExState = IApiTreeGridExState> extends IApiTreeController<T, S> {
    /**
     * @description 树表格列控制器，包含表格列相关能力,key为表格列代码名称，可通过ctrl.columns['树表格列codeName']
     * @type {{ [key: string]: IApiTreeGridExColumnController }}
     * @memberof IApiTreeGridEXController
     */
    columns: {
        [key: string]: IApiTreeGridExColumnController;
    };
    /**
     * @description 保存数据
     * @param {IApiTreeNodeData} data 树节点数据
     * @returns {*}  {Promise<void>}
     * @memberof IApiTreeGridEXController
     */
    save(data: IApiTreeNodeData): Promise<void>;
    /**
     * @description 保存所有变更数据
     * @returns {*}  {Promise<void>}
     * @memberof IApiTreeGridEXController
     */
    saveAll(): Promise<void>;
    /**
     * @description 切换行编辑状态
     * @returns {*}  {Promise<void>}
     * @memberof IApiTreeGridEXController
     */
    toggleRowEdit(): Promise<void>;
    /**
     * @description 切换行编辑状态，editable表示行编辑目标状态，isSave=true表示关闭编辑时自动保存（默认true）
     * @param {IApiTreeGridExRowState} row 行状态
     * @param {boolean} [editable] 是否为编辑状态
     * @param {boolean} [isSave] 是否保存数据
     * @returns {*}  {Promise<void>}
     * @memberof IApiTreeGridEXController
     */
    switchRowEdit(row: IApiTreeGridExRowState, editable?: boolean, isSave?: boolean): Promise<void>;
    /**
     * @description 获取行状态（key 为 IApiGanttNodeData._id（节点唯一标识））
     * @param {string} key 行数据标识
     * @returns {*}  {(IApiTreeGridExRowState | undefined)}
     * @memberof IApiTreeGridEXController
     */
    getRowState(key: string): IApiTreeGridExRowState | undefined;
    /**
     * @description 设置行属性值，其中ignore=是否忽略脏值检查（true=不提示用户数据变更，默认false）
     * @param {IApiTreeGridExRowState} row 行状态对象
     * @param {string} name 属性名称
     * @param {unknown} value 属性值
     * @param {boolean} [ignore] 忽略脏值检查
     * @returns {*}  {Promise<void>}
     * @memberof IApiTreeGridEXController
     */
    setRowValue(row: IApiTreeGridExRowState, name: string, value: unknown, ignore?: boolean): Promise<void>;
    /**
     * @description 计算默认值
     * @param {IApiTreeNodeData} data 树节点数据
     * @param {boolean} isCreate 是否为新建数据
     * @returns {*}  {IApiData}
     * @memberof IApiTreeGridEXController
     */
    calcDefaultValue(data: IApiTreeNodeData, isCreate: boolean): IApiData;
}
//# sourceMappingURL=i-api-tree-grid-ex.controller.d.ts.map