import { ViewController, ITreeGridViewEvent, ITreeGridViewState, TreeGridController } from '@ibiz-template/runtime';
import { IAppDETreeGridView } from '@ibiz/model-core';
import { GridViewEngine } from './grid-view.engine';
export declare class TreeGridViewEngine extends GridViewEngine {
    protected view: ViewController<IAppDETreeGridView, ITreeGridViewState, ITreeGridViewEvent>;
    /**
     * 多数据部件名称
     *
     * @author zk
     * @date 2023-10-07 06:10:44
     * @readonly
     * @type {string}
     * @memberof TreeGridViewEngine
     */
    get xdataControlName(): string;
    get treeGrid(): TreeGridController;
    onCreated(): Promise<void>;
    call(key: string, args: any): Promise<IData | null | undefined>;
}
