import { ViewController, IPickupDataViewEvent, IPickupDataViewState, IDataViewControlController } from '@ibiz-template/runtime';
import { IAppDEDataView } from '@ibiz/model-core';
import { DataViewEngine } from './data-view.engine';
export declare class PickupDataViewEngine extends DataViewEngine {
    protected view: ViewController<IAppDEDataView, IPickupDataViewState, IPickupDataViewEvent>;
    /**
     * 表格控制器
     *
     * @author zk
     * @date 2023-05-26 05:05:43
     * @readonly
     * @memberof PickupDataViewViewEngine
     */
    get dataview(): IDataViewControlController;
    onCreated(): Promise<void>;
    onMounted(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
