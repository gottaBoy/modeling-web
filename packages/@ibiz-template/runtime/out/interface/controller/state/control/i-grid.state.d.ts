import { ControlVO } from '../../../../service';
import { IButtonContainerState } from '../../common';
import { IMDControlState } from './i-md-control.state';
export interface IGridState extends IMDControlState {
    /**
     * 表格行状态
     *
     * @author lxm
     * @date 2022-09-05 19:09:12
     * @type {IGridRowState[]}
     */
    rows: IGridRowState[];
    /**
     * 表格列状态数组
     * 顺序就是列的排序
     * @author lxm
     * @date 2023-08-04 07:08:16
     * @type {IColumnState[]}
     */
    columnStates: IColumnState[];
    /**
     * 聚合计算的结果
     * @author lxm
     * @date 2023-08-07 04:09:08
     * @type {IData}
     */
    aggResult: IData;
    /**
     * 统计结果
     *
     * @type {IData}
     * @memberof IGridState
     */
    totalResult: IData;
    /**
     * 远程聚合计算结果
     * @author lxm
     * @date 2023-08-07 05:36:54
     * @type {IData}
     */
    remoteAggResult?: IData;
    /**
     * 开启表格行编辑
     * @author lxm
     * @date 2023-08-17 02:38:18
     * @type {boolean}
     */
    rowEditOpen: boolean;
    /**
     * 是否为自动表格
     *
     * @type {boolean}
     * @memberof IGridState
     */
    isAutoGrid: boolean;
    /**
     * 表格popover层级
     * @author fzh
     * @date 2024-02-04 18:57:18
     * @type {number}
     */
    zIndex?: number;
    /**
     * 隐藏表格头部
     * @author fzh
     * @date 2024-02-04 18:57:18
     * @type {boolean}
     */
    hideHeader?: boolean;
    /**
     * 支持分页栏
     * @author fzh
     * @date 2024-02-04 18:57:18
     * @type {boolean}
     */
    enablePagingBar?: boolean;
    /**
     * simple数据
     *
     * @author zhanghengfeng
     * @date 2024-09-04 20:09:33
     * @type {IData[]}
     */
    simpleData?: IData[];
}
export interface IGridRowState {
    /**
     * 数据
     * @author lxm
     * @date 2023-05-18 03:33:23
     * @type {ControlVO}
     */
    data: ControlVO;
    /**
     * 旧数据
     * @author zzq
     * @date 2024-03-20 14:33:23
     * @type {ControlVO}
     */
    oldData: ControlVO;
    /**
     * 错误信息集合，p是对应属性名称
     *
     * @author lxm
     * @date 2022-09-06 15:09:54
     * @type {({ [p: string]: string | null })}
     */
    errors: {
        [p: string]: string | null;
    };
    /**
     * 操作列状态(p是操作列的标识)
     *
     * @author lxm
     * @date 2022-09-07 22:09:38
     * @type {({ [p: string]: IButtonContainerState  })}
     */
    uaColStates: {
        [p: string]: IButtonContainerState;
    };
    /**
     * 界面行为组状态(p是界面行为的标识)
     *
     * @author zk
     * @date 2023-12-15 10:12:42
     * @type {{ [p: string]: IButtonContainerState }}
     * @memberof IGridRowState
     */
    uiActionGroupStates: {
        [p: string]: IButtonContainerState;
    };
    /**
     * 编辑列的状态
     *
     * @author lxm
     * @date 2022-09-20 15:09:58
     * @type {({ [p: string]: { disabled: boolean } })}
     */
    editColStates: {
        [p: string]: {
            disabled: boolean;
            readonly: boolean;
            editable: boolean;
            required: boolean;
        };
    };
    /**
     * 是否显示行编辑
     *
     * @author lxm
     * @date 2022-09-05 22:09:23
     * @type {boolean}
     */
    showRowEdit: boolean;
    /**
     * 是否被修改过
     *
     * @author lxm
     * @date 2022-11-02 22:11:33
     * @type {boolean}
     */
    modified: boolean;
    /**
     * 是否正在处理中(动态控制，值规则，表单项更新等逻辑中)
     * @author lxm
     * @date 2023-03-06 08:00:22
     * @type {boolean}
     * @memberof GridRowState
     */
    processing: boolean;
    /**
     * 缓存的数据对象
     * @author lxm
     * @date 2023-09-18 05:11:32
     * @type {IData}
     */
    cacheData?: ControlVO;
    /**
     * 获取改变数据
     * @author zzq
     * @date 2024-03-20 15:11:32
     * @type {IData}
     */
    getDiffData(): ControlVO;
}
/**
 * 表格列状态
 * @author lxm
 * @date 2023-08-04 07:19:02
 * @export
 * @interface IColumnState
 */
export interface IColumnState {
    /**
     * 列标识,是列模型的codeName
     * @author lxm
     * @date 2023-08-04 07:16:07
     * @type {string}
     */
    key: string;
    /**
     * 列的中文标题
     * @author lxm
     * @date 2023-08-04 07:17:57
     * @type {string}
     */
    caption: string;
    /**
     * 显示隐藏
     * @author lxm
     * @date 2023-08-04 07:18:47
     * @type {boolean}
     */
    hidden: boolean;
    /**
     * 隐藏模式，0：默认不隐藏，1：默认隐藏，2：始终隐藏，3：从不隐藏
     *
     * @author tony001
     * @date 2024-06-14 13:06:28
     * @type {(number)}
     */
    hideMode: number;
    /**
     * 是否是操作列
     * @author lxm
     * @date 2023-08-31 04:54:58
     * @type {boolean}
     */
    uaColumn: boolean;
    /**
     * 是否是固定列，固定在左侧还是右侧
     * @author lxm
     * @date 2023-08-31 04:55:24
     * @type {('left' | 'right')}
     */
    fixed?: 'left' | 'right';
    /**
     * 是否是自适应列
     * @author lxm
     * @date 2024-02-05 01:51:07
     * @type {boolean}
     */
    adaptive?: boolean;
    /**
     * 列宽
     *
     * @type {number}
     * @memberof IColumnState
     */
    columnWidth?: number;
}
/**
 * 本地存储表格列状态对象
 * @return {*}
 * @author: zhujiamin
 * @Date: 2024-01-05 11:38:38
 */
export interface IStorageColumnStates {
    /**
     * 开启jsonschema下的表格列状态
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-05 11:39:22
     */
    schemaColumnStates?: IColumnState[];
    /**
     * 默认表格列状态
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-01-05 11:39:22
     */
    defaultColumnStates?: IColumnState[];
}
//# sourceMappingURL=i-grid.state.d.ts.map