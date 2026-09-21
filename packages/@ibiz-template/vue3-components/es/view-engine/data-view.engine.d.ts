import { MDViewEngine, ViewController, IDataViewState, IDataViewEvent, IDataViewControlController } from '@ibiz-template/runtime';
import { IAppDEDataView } from '@ibiz/model-core';
export declare class DataViewEngine extends MDViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEDataView, IDataViewState, IDataViewEvent>}
     * @memberof DataViewEngine
     */
    protected view: ViewController<IAppDEDataView, IDataViewState, IDataViewEvent>;
    /**
     * 数据视图（卡片）部件
     *
     * @readonly
     * @memberof DataViewEngine
     */
    get dataview(): IDataViewControlController;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @memberof DataViewEngine
     */
    onCreated(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
