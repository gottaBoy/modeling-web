import { IDETreeGrid } from '@ibiz/model-core';
import { ITreeGridEvent, ITreeGridState, MDCtrlLoadParams, ITreeGridController } from '../../../interface';
import { GridController } from '../grid';
import { ControlVO } from '../../../service';
export declare class TreeGridController<T extends IDETreeGrid = IDETreeGrid, S extends ITreeGridState = ITreeGridState, E extends ITreeGridEvent = ITreeGridEvent> extends GridController<T, S, E> implements ITreeGridController<T, S, E> {
    /**
     * 树表格值属性名称
     *
     */
    treeGridValueField: string;
    /**
     * 树表格父属性名称
     *
     */
    treeGridParentField: string;
    protected initState(): void;
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-08-18 22:08:17
     * @protected
     * @returns {*}  {Promise<void>}
     */
    protected onCreated(): Promise<void>;
    /**
     * 初始化树表格字段
     * @return {*}
     * @author: zhujiamin
     */
    protected initTreeGridField(): void;
    /**
     * @description  处理刷新模式
     * @protected
     * @param {MDCtrlLoadParams} args
     * @memberof TreeGridController
     */
    protected handleRefreshMode(args: MDCtrlLoadParams): void;
    afterLoad(args: MDCtrlLoadParams, items: ControlVO[]): Promise<ControlVO[]>;
    /**
     * @description 获取树表格数据项
     * @param {IData} data
     * @return {*}  {IData}
     * @memberof TreeGridController
     */
    getTreeGridDataItem(data: IData): IData;
    /**
     * @description 计算树表格数据
     * @param {IData[]} items
     * @memberof TreeGridController
     */
    calcTreeGridData(items: IData[]): void;
    /**
     * 切换树表格显示
     * @return {*}
     * @author: zhujiamin
     */
    switchTreeGridShow(): void;
    /**
     * @description 切换折叠,tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof TreeGridController
     */
    changeCollapse(params?: {
        tag?: string;
        expand?: boolean;
    }): void;
}
//# sourceMappingURL=tree-grid.controller.d.ts.map