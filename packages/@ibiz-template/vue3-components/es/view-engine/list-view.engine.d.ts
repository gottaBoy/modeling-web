import { MDViewEngine, ViewController, IListViewState, IListViewEvent, IListController } from '@ibiz-template/runtime';
import { IAppDEListView } from '@ibiz/model-core';
export declare class ListViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDEListView, IListViewState, IListViewEvent>;
    get list(): IListController;
    onMounted(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
