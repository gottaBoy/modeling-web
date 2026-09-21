import { ITreeGridExState } from './i-tree-grid-ex.state';
import { ITreeNodeData } from './i-tree.state';
/**
 * 甘特图状态
 *
 * @author tony001
 * @date 2023-12-11 17:12:57
 * @export
 * @interface IGanttState
 * @extends {ITreeState}
 */
export interface IGanttState extends ITreeGridExState {
    /**
     * 甘特图样式
     *
     * @type {IGanttStyle}
     * @memberof IGanttState
     */
    ganttStyle: IGanttStyle;
    /**
     * 是否开启滑块拖拽
     */
    sliderDraggable: boolean;
    /**
     * 必须显示的列名称
     * @description 没有配置时默认值为["sn", "name"]，配置部件参数时数组内填写树表格列标识，以引号包裹名称
     * ```
     * 部件参数配置格式如下
     * mustshowcolumns=["sn","name"]
     * ```
     */
    mustShowColumns: string[] | null;
}
export interface IGanttStyle {
    /**
     * 主题色
     *
     * @type {string}
     * @memberof IGanttStyle
     */
    primaryColor?: string;
    /**
     * 文本色
     *
     * @type {string}
     * @memberof IGanttStyle
     */
    textColor?: string;
}
/**
 * 甘特图节点数据格式
 *
 * @author tony001
 * @date 2023-12-11 17:12:51
 * @export
 * @interface IGanttNodeData
 */
export interface IGanttNodeData extends ITreeNodeData {
    /**
     * 编号
     *
     * @author tony001
     * @date 2023-12-11 17:12:39
     * @type {string}
     */
    _snDataItemValue: string;
    /**
     * 开始时间
     *
     * @author tony001
     * @date 2023-12-11 17:12:12
     * @type {string}
     */
    _beginDataItemValue: string;
    /**
     * 结束时间
     *
     * @author tony001
     * @date 2023-12-11 17:12:52
     * @type {string}
     */
    _endDataItemValue: string;
    /**
     * 前置数据
     *
     * @author tony001
     * @date 2023-12-11 17:12:13
     * @type {(string | number)}
     */
    _prevDataItemValue: string | number;
    /**
     * 完成量数据
     *
     * @author tony001
     * @date 2023-12-11 17:12:26
     * @type {(string | number)}
     */
    _finishDataItemValue: string | number;
    /**
     * 总量数据项
     *
     * @author tony001
     * @date 2023-12-11 17:12:43
     * @type {(string | number)}
     */
    _totalDataItemValue: string | number;
    /**
     * 子数据
     *
     * @author tony001
     * @date 2023-12-11 18:12:16
     * @type {(IGanttNodeData[] | undefined)}
     */
    _children?: IGanttNodeData[] | undefined;
    /**
     * 父节点数据对象
     *
     * @type {IGanttNodeData}
     * @memberof IGanttNodeData
     */
    _parent?: IGanttNodeData;
}
//# sourceMappingURL=i-gantt.state.d.ts.map