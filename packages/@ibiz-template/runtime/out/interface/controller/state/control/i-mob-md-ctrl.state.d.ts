import { ControlVO } from '../../../../service';
import { IButtonContainerState } from '../../common';
import { IMobMDCtrlController } from '../../controller';
import { IListState } from './i-list.state';
/**
 * 多数据视图行数据
 *
 * @author chitanda
 * @date 2023-06-19 20:06:34
 * @export
 * @interface IMobMDCtrlRowState
 */
export interface IMobMDCtrlRowState {
    /**
     * 界面行为状态
     *
     * @author chitanda
     * @date 2023-06-19 20:06:27
     * @type {{ [p: string]: IButtonContainerState }}
     */
    uaColStates: {
        [p: string]: IButtonContainerState;
    };
    /**
     * 行数据
     *
     * @author chitanda
     * @date 2023-06-19 20:06:34
     * @type {ControlVO}
     */
    data: ControlVO;
    /**
     * 多数据部件控制器
     *
     * @author chitanda
     * @date 2023-06-19 20:06:42
     * @type {IMobMDCtrlController}
     */
    controller: IMobMDCtrlController;
}
/**
 * 移动端多数据部件状态
 *
 * @author chitanda
 * @date 2023-06-16 10:06:37
 * @export
 * @interface IMobMdCtrlState
 * @extends {IListState}
 */
export interface IMobMdCtrlState extends IListState {
    /**
     * 多数据视图行数据
     *
     * @author chitanda
     * @date 2023-06-19 20:06:27
     * @type {IMDCtrlRowState[]}
     */
    rows: IMobMDCtrlRowState[];
}
//# sourceMappingURL=i-mob-md-ctrl.state.d.ts.map