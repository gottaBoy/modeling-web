import { ViewController, IPickupTreeViewState, IPickupTreeViewEvent } from '@ibiz-template/runtime';
import { IAppDETreeView } from '@ibiz/model-core';
import { TreeViewEngine } from './tree-view.engine';
export declare class PickupTreeViewEngine extends TreeViewEngine {
    protected view: ViewController<IAppDETreeView, IPickupTreeViewState, IPickupTreeViewEvent>;
    /**
     * 选中数据
     *
     * @type {IData[]}
     * @memberof PickupViewEngine
     */
    selectData: IData[];
    /**
     * 通过srfkey选中数据
     * @author lxm
     * @date 2024-02-21 09:17:23
     * @type {boolean}
     */
    selectBySrfkey: boolean;
    /**
     * 创建完成
     *
     * @author zk
     * @date 2023-05-26 05:05:35
     * @memberof PickupGridViewEngine
     */
    onCreated(): Promise<void>;
    /**
     * 根据key计算需要展开的节点标识
     * @author lxm
     * @date 2023-11-07 02:42:45
     * @param {string} key
     * @return {*}  {string[]}
     */
    calcExpandKeys(key: string): string[];
    /**
     * 挂载完成
     *
     * @author zk
     * @date 2023-05-26 10:05:13
     * @memberof PickupGridViewEngine
     */
    onMounted(): Promise<void>;
    call(key: string, args: IData | undefined): Promise<IData | null | undefined>;
}
