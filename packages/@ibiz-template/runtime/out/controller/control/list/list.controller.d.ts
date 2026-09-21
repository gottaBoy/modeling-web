import { IDEList, IUIActionGroupDetail } from '@ibiz/model-core';
import { IListState, IListEvent, IListController, MDCtrlLoadParams, IMDControlGroupState } from '../../../interface';
import { MDControlController } from '../../common';
import { ListService } from './list.service';
export declare class ListController extends MDControlController<IDEList, IListState, IListEvent> implements IListController {
    service: ListService;
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * @description 初始化分组界面行为组
     * @return {*}  {Promise<void>}
     * @memberof ListController
     */
    initGroupActionStates(): Promise<void>;
    /**
     * @description 分组界面行为点击
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IMDControlGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof ListController
     */
    onGroupToolbarClick(detail: IUIActionGroupDetail, event: MouseEvent, group: IMDControlGroupState): Promise<void>;
    /**
     * 获取部件默认排序模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-28 18:43:27
     */
    getSortModel(): {
        minorSortAppDEFieldId: string | undefined;
        minorSortDir: string | undefined;
    };
    /**
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(items: IData): void;
    /**
     * 滚动到顶部
     *
     * @memberof ListController
     */
    scrollToTop(): void;
    /**
     * 特殊处理，加载模式为滚动加载或者点击加载，刷新时加载数据条数为分页乘以默认条数
     *
     * @return {*}  {Promise<void>}
     * @memberof ListController
     */
    refresh(): Promise<void>;
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:46
     * @param {IData[]} items
     * @memberof ListController
     */
    setData(items: IData[]): void;
    /**
     * 获取列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:35
     * @return {*}  {IData[]}
     * @memberof ListController
     */
    getAllData(): IData[];
    /**
     * 处理数据分组
     *
     * @memberof DataViewControlController
     */
    protected handleDataGroup(): Promise<void>;
    /**
     * 处理自动分组
     *
     * @memberof DataViewControlController
     */
    protected handleAutoGroup(): Promise<void>;
    /**
     * 处理代码表分组
     *
     * @memberof DataViewControlController
     */
    protected handleCodeListGroup(): Promise<void>;
    /**
     * @description 切换分组折叠
     * @param {IData} [params={}]
     * @memberof ListController
     */
    changeCollapse(params?: IData): void;
}
//# sourceMappingURL=list.controller.d.ts.map