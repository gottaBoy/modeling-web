import { IDEMobMDCtrl, IUIActionGroup, IUIActionGroupDetail } from '@ibiz/model-core';
import { IMobMDCtrlEvent, IMobMDCtrlController, IMobMdCtrlState, IMobMDCtrlRowState, MDCtrlLoadParams, CodeListItem, ISearchGroupData } from '../../../interface';
import { MDCtrlService } from './md-ctrl.service';
import { MobMDCtrlRowState } from './md-ctrl-row.state';
import { MDControlController } from '../../common';
import { ControlVO } from '../../../service';
export declare class MDCtrlController extends MDControlController<IDEMobMDCtrl, IMobMdCtrlState, IMobMDCtrlEvent> implements IMobMDCtrlController {
    service: MDCtrlService;
    protected initState(): void;
    /**
     * 分组代码表项集合
     *
     * @author zk
     * @date 2023-10-11 04:10:06
     * @type {readonly}
     * @memberof MDCtrlController
     */
    groupCodeListItems?: readonly CodeListItem[];
    protected onCreated(): Promise<void>;
    /**
     * 加载更多
     * @author lxm
     * @date 2023-05-22 07:33:59
     * @return {*}  {Promise<void>}
     */
    loadMore(): Promise<void>;
    /**
     * 列表多数据刷新 需重置分页
     *
     * @author zk
     * @date 2023-08-11 05:08:20
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    refresh(): Promise<void>;
    /**
     * 部件加载后处理
     *
     * @param {MDCtrlLoadParams} args
     * @param {ControlVO[]} items
     * @return {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    afterLoad(args: MDCtrlLoadParams, items: ControlVO[]): Promise<IData[]>;
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:46
     * @param {IData[]} items
     * @memberof MDCtrlController
     */
    setData(items: IData[]): void;
    /**
     * 获取列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:35
     * @return {*}  {IData[]}
     * @memberof MDCtrlController
     */
    getAllData(): IData[];
    /**
     * 界面行为组项点击
     *
     * @author chitanda
     * @date 2023-06-19 18:06:18
     * @param {IUIActionGroupDetail} detail
     * @param {MDCtrlRowState} row
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    onActionClick(detail: IUIActionGroupDetail, row: IMobMDCtrlRowState, event: MouseEvent): Promise<void>;
    /**
     * 初始化按钮状态
     *
     * @protected
     * @param {MobMDCtrlRowState} row
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    protected initActionStates(row: MobMDCtrlRowState): Promise<void>;
    /**
     * 初始化（左右）行为组权限
     *
     * @protected
     * @param {MobMDCtrlRowState} row
     * @param {IUIActionGroup} group
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    protected initUIActionGroup(row: MobMDCtrlRowState, group: IUIActionGroup): Promise<void>;
    /**
     * 处理数据分组
     *
     * @memberof MDCtrlController
     */
    protected handleDataGroup(): Promise<void>;
    /**
     * 处理自动分组
     *
     * @memberof MDCtrlController
     */
    protected handleAutoGroup(): Promise<void>;
    /**
     * 加载并初始化分组代码表项集合
     * @author lxm
     * @date 2023-08-29 05:11:39
     * @protected
     * @return {*}  {Promise<void>}
     */
    protected initGroupCodeListItems(): Promise<void>;
    /**
     * 处理代码表分组
     *
     * @memberof MDCtrlController
     */
    protected handleCodeListGroup(): Promise<void>;
    changeCollapse(params?: IData): void;
    /**
     * 移动端-设置分组点击
     *
     * @param {ISearchGroupData} data
     * @memberof MDCtrlController
     */
    setGroupParams(data: ISearchGroupData): void;
}
//# sourceMappingURL=md-ctrl.controller.d.ts.map