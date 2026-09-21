import { IDRBarController, IEditView2Event, IEditView2State, ViewController } from '@ibiz-template/runtime';
import { IAppDEEditView } from '@ibiz/model-core';
import { EditViewEngine } from './edit-view.engine';
/**
 * 编辑视图2（左右关系）
 *
 * @export
 * @class EditView2Engine
 * @extends {EditViewEngine}
 */
export declare class EditView2Engine extends EditViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDEEditView,
     *     IEditView2State,
     *     IEditView2Event
     *   >}
     * @memberof EditView2Engine
     */
    protected view: ViewController<IAppDEEditView, IEditView2State, IEditView2Event>;
    onCreated(): Promise<void>;
    /**
     * 数据关系栏
     *
     * @readonly
     * @memberof EditView2Engine
     */
    get drbar(): IDRBarController;
}
