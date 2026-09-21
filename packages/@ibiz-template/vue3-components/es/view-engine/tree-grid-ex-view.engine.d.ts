import { ViewController, ITreeGridExViewEvent, ITreeGridExViewState, ITreeGridExController } from '@ibiz-template/runtime';
import { IAppDETreeGridExView } from '@ibiz/model-core';
import { TreeViewEngine } from './tree-view.engine';
export declare class TreeGridExViewEngine extends TreeViewEngine {
    protected view: ViewController<IAppDETreeGridExView, ITreeGridExViewState, ITreeGridExViewEvent>;
    get treeGridEx(): ITreeGridExController;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
