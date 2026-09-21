import { ViewController, ITreeViewEvent, ITreeViewState, MDViewEngine, ITreeController } from '@ibiz-template/runtime';
import { IAppDETreeView } from '@ibiz/model-core';
export declare class TreeViewEngine extends MDViewEngine {
    protected view: ViewController<IAppDETreeView, ITreeViewState, ITreeViewEvent>;
    get tree(): ITreeController;
    onCreated(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
