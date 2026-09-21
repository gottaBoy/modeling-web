import { IGridRowState, IButtonContainerState } from '../../../../interface';
import { ControlVO } from '../../../../service';
import { GridController } from './grid.controller';
/**
 * 表格行数据状态管理控制器
 *
 * @author lxm
 * @date 2022-09-05 19:09:02
 * @export
 * @class GridRowState
 */
export declare class GridRowState implements IGridRowState {
    data: ControlVO;
    oldData: ControlVO;
    cacheData?: ControlVO;
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
     * @type {({ [p: string]: IButtonContainerState })}
     */
    uaColStates: {
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
    getDiffData(): ControlVO;
    constructor(data: ControlVO, grid: GridController);
}
//# sourceMappingURL=grid-row.state.d.ts.map