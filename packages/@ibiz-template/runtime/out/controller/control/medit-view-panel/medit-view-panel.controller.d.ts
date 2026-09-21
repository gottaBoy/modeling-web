import { IDEMultiEditViewPanel } from '@ibiz/model-core';
import { IMEditViewPanelState, IMEditViewPanelEvent, IMEditViewPanelController, MDCtrlLoadParams, IPanelUiItem, DataChangeEvent } from '../../../interface';
import { ControlVO } from '../../../service';
import { MDControlController } from '../../common';
import { MEditViewPanelService } from './medit-view-panel.service';
/**
 * 多编辑视图面板部件控制器
 * @export
 * @class MEditViewPanelController
 * @extends {MDControlController<IDEMultiEditViewPanel, IMEditViewPanelState, IMEditViewPanelEvent>}
 * @implements {IMEditViewPanelController}
 */
export declare class MEditViewPanelController extends MDControlController<IDEMultiEditViewPanel, IMEditViewPanelState, IMEditViewPanelEvent> implements IMEditViewPanelController {
    service: MEditViewPanelService;
    /**
     * 当前应用视图参数对象
     *
     */
    parameters: IData[];
    protected onCreated(): Promise<void>;
    protected initState(): void;
    /**
     * 初始化嵌入应用视图及实体参数对象
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-16 13:56:56
     */
    initParameters(): Promise<void>;
    /**
     * 部件加载后处理
     *
     * @author chitanda
     * @date 2023-06-21 15:06:44
     * @param {MDCtrlLoadParams} args 本次请求参数
     * @param {IData[]} items 上游处理的数据（默认是后台数据）
     * @return {*}  {Promise<IData[]>} 返回给后续处理的数据
     */
    afterLoad(args: MDCtrlLoadParams, items: ControlVO[]): Promise<ControlVO[]>;
    /**
     * 处理UI所需数据
     * @param {ControlVO} arg
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-16 17:55:31
     */
    handlePanelItemParams(arg: ControlVO): IPanelUiItem;
    /**
     * 处理数据
     * @param {ControlVO} datas
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-16 15:00:02
     */
    doItems(datas: ControlVO[], tempPanelUiItems?: IPanelUiItem[]): void;
    /**
     * 处理添加
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-16 15:18:01
     */
    handleAdd(): Promise<void>;
    /**
     * 处理删除
     * @param {IPanelUiItem} item
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-16 15:23:59
     */
    handleDelete(item: IPanelUiItem): Promise<void>;
    /**
     * 处理tab删除
     * @param {IPanelUiItem} item
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-17 14:21:57
     */
    handleTabDelete(item: IPanelUiItem, index: number): Promise<void>;
    /**
     * 后台删除结束后界面删除逻辑
     *
     * @author lxm
     * @date 2022-09-06 19:09:10
     * @param {IData} data
     */
    afterRemove(data: IData): void;
    /**
     * 视图数据变化
     * @param {DataChangeEvent} args
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-10-16 17:20:45
     */
    onViewDataChange(args: DataChangeEvent, id: string): void;
    /**
     * 处理数据变化
     *
     * @param {ControlVO} data
     * @returns {*}  {Promise<void>}
     */
    handleDataChange(data: ControlVO, id: string): Promise<void>;
}
//# sourceMappingURL=medit-view-panel.controller.d.ts.map