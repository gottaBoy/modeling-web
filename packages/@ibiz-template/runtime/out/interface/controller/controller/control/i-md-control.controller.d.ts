import { IMDControl } from '@ibiz/model-core';
import { IDataAbilityParams } from '../../../common';
import { IMDControlEvent } from '../../event';
import { IMDControlState } from '../../state';
import { IControlController } from './i-control.controller';
export interface MDCtrlLoadParams extends IDataAbilityParams {
    /**
     * 是否是初始加载
     */
    isInitialLoad?: boolean;
    /**
     * 是否加载更多
     *
     * @author chitanda
     * @date 2023-06-19 19:06:26
     * @type {boolean}
     */
    isLoadMore?: boolean;
    /**
     * 触发源
     *
     * @author tony001
     * @date 2025-01-09 17:01:24
     * @type {('DEFAULT' | 'REFRESH' | string)}
     */
    triggerSource?: 'DEFAULT' | 'REFRESH' | string;
}
export interface MDCtrlRemoveParams extends IDataAbilityParams {
    /**
     * 是否不需要刷新(默认为否，如果不需要刷新传true)
     * @author lxm
     * @date 2023-08-17 06:04:23
     * @type {boolean}
     */
    notRefresh?: boolean;
}
/**
 * 多数据部件控制器
 * @author lxm
 * @date 2023-05-04 01:47:24
 * @export
 * @interface IMDControlController
 * @extends {IControlController}
 */
export interface IMDControlController<T extends IMDControl = IMDControl, S extends IMDControlState = IMDControlState, E extends IMDControlEvent = IMDControlEvent> extends IControlController<T, S, E> {
    /**
     * 加载数据
     * @author lxm
     * @date 2023-05-22 01:23:50
     * @return {*}  {Promise<IData[]>}
     */
    load(args?: MDCtrlLoadParams): Promise<IData[]>;
    /**
     * 删除数据
     * @author lxm
     * @date 2023-05-22 01:24:26
     * @return {*}  {Promise<void>}
     */
    remove(args?: MDCtrlRemoveParams): Promise<void>;
    /**
     * 刷新数据
     * @author lxm
     * @date 2023-05-23 02:10:08
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 导入数据
     * @author lxm
     * @date 2023-05-22 01:25:11
     * @return {*}  {Promise<void>}
     */
    importData(): Promise<void>;
    /**
     * 导出数据
     * @author lxm
     * @date 2023-05-22 01:25:19
     * @param {{ event: MouseEvent }} _args
     * @return {*}  {Promise<void>}
     */
    exportData(_args: {
        event: MouseEvent;
    }): Promise<void>;
    /**
     * 获取选中数据
     * @author lxm
     * @date 2023-05-22 01:26:47
     * @return {*}  {IData[]}
     */
    getData(): IData[];
    /**
     * 设置选中数据
     * 会触发onSelectionChange事件
     * 设置的数据和已经选中的一样时不会触发onSelectionChange事件
     * @author lxm
     * @date 2023-05-22 11:34:12
     * @param {IData[]} selection
     */
    setSelection(selection: IData[]): void;
    /**
     * 设置激活数据
     * @author lxm
     * @date 2023-05-22 11:40:53
     * @param {IData} data
     * @param {MouseEvent | undefined} event
     * @return {*}  {Promise<void>}
     */
    setActive(data: IData, event?: MouseEvent | undefined): Promise<void>;
    /**
     * 跳转第一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:08
     * @return {*}  {Promise<IData[]>}
     */
    goToFirstPage(): Promise<IData[]>;
    /**
     * 跳转上一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:59
     * @return {*}  {Promise<IData[]>}
     */
    goToPreviousPage(): Promise<IData[]>;
    /**
     * 跳转下一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:19
     * @return {*}  {Promise<IData[]>}
     */
    goToNextPage(): Promise<IData[]>;
    /**
     * 跳转最后一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:32
     * @return {*}  {Promise<IData[]>}
     */
    goToLastPage(): Promise<IData[]>;
    /**
     * 内置导航视图显示变化
     *
     * @memberof IMDControlController
     */
    onShowNavViewChange(): void;
    /**
     * 打开内置导航视图
     * - 默认为当前激活数据
     * @param {IData} [data]
     * @memberof IMDControlController
     */
    openNavView(data?: IData): void;
}
//# sourceMappingURL=i-md-control.controller.d.ts.map