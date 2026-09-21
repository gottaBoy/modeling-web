import { MDViewEngine, ViewController, IKanbanViewState, IKanbanViewEvent, IKanbanController } from '@ibiz-template/runtime';
import { IAppDEKanbanView } from '@ibiz/model-core';
export declare class KanbanViewEngine extends MDViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEKanbanView, IKanbanViewState, IKanbanViewEvent>}
     * @memberof KanbanViewEngine
     */
    protected view: ViewController<IAppDEKanbanView, IKanbanViewState, IKanbanViewEvent>;
    /**
     * 数据视图（卡片）部件
     *
     * @readonly
     * @memberof KanbanViewEngine
     */
    get kanbanview(): IKanbanController;
    /**
     * 视图mounted生命周期执行逻辑
     *
     * @memberof KanbanViewEngine
     */
    onCreated(): Promise<void>;
}
