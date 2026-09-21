import { IButtonContainerState } from '../../common';
import { IControlState } from './i-control.state';
export interface IMDControlState extends IControlState {
    /**
     * 多数据部件数据集合
     * @author lxm
     * @date 2022-08-17 19:08:11
     * @type {IData[]}
     */
    items: IData[];
    /**
     * 多数据部件已选中的数据集合
     *
     * @author lxm
     * @date 2022-08-18 22:08:14
     * @type {IData[]}
     */
    selectedData: IData[];
    /**
     * 是否是单项选择
     *
     * @author lxm
     * @date 2022-08-19 10:08:29
     * @type {boolean}
     */
    singleSelect: boolean;
    /**
     * 多数据部件激活模式
     * @description 值模式 [应用表格数据激活模式] {0：无、 1：单击、 2：双击 }
     * @author lxm
     * @date 2023-05-22 09:52:44
     * @type {(number | 0 | 1 | 2)}
     */
    mdctrlActiveMode: number | 0 | 1 | 2;
    /**
     * 当前页
     */
    curPage: number;
    /**
     * 分页条数
     */
    size: number;
    /**
     * 总条数
     */
    total: number;
    /**
     * 全部计数条数
     * - 数据集配置需勾选返回全部计数
     * @type {number}
     * @memberof IMDControlState
     */
    totalx?: number;
    /**
     * 总页数
     */
    totalPages: number;
    /**
     * 是否加载过数据
     * 用于某些需要等待数据加载回来之后的场景。
     */
    isLoaded: boolean;
    /**
     * 搜索部件的查询参数
     * @author lxm
     * @date 2023-03-29 12:02:18
     * @type {IParams}
     */
    searchParams: IParams;
    /**
     * 是否禁用排序
     * @author lxm
     * @date 2023-05-22 01:24:40
     * @type {boolean}
     */
    noSort: boolean;
    /**
     * 排序查询条件
     * @author lxm
     * @date 2023-05-22 01:12:20
     * @type {string}
     */
    sortQuery: string;
    /**
     * 分组数据
     *
     * @type {IDataViewControlGroupState[]}
     * @memberof IDataViewControlState
     */
    groups: IMDControlGroupState[];
    /**
     * 隐藏无数据图片
     * @author fzh
     * @date  2024-05-31 09:43:26
     * @type {boolean}
     */
    hideNoDataImage: boolean;
    /**
     * 是否启用内置导航视图
     *
     * @type {boolean}
     * @memberof IMDControlState
     */
    enableNavView: boolean;
    /**
     * 是否显示内置导航视图
     *
     * @type {boolean}
     * @memberof IMDControlState
     */
    showNavView: boolean;
    /**
     * 是否显示内置导航图标
     * - 导航视图显示模式为程序控制时不显示
     * @type {boolean}
     * @memberof IMDControlState
     */
    showNavIcon: boolean;
}
export interface IMDControlGroupState {
    /**
     * 子数据
     *
     * @type {IData[]}
     * @memberof IMDControlGroupState
     */
    children: IData[];
    /**
     * 分组标题
     *
     * @type {string}
     * @memberof IMDControlGroupState
     */
    caption: string;
    /**
     * 分组唯一标识（分组属性对应的值）
     * @author lxm
     * @date 2023-08-30 04:37:05
     * @type {string}
     */
    key: string | number;
    /**
     * 分组界面行为组状态
     *
     * @type {(IButtonContainerState)}
     * @memberof IMDControlGroupState
     */
    groupActionGroupState?: IButtonContainerState;
    /**
     * 当前分组已选中的数据集合
     *
     * @type {IData[]}
     */
    selectedData?: IData[];
}
//# sourceMappingURL=i-md-control.state.d.ts.map