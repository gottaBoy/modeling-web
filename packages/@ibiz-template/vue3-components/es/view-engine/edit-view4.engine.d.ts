import { IDRTabController, IEditView4Event, IEditView4State, ViewController } from '@ibiz-template/runtime';
import { IAppDEEditView } from '@ibiz/model-core';
import { EditViewEngine } from './edit-view.engine';
/**
 * 编辑视图4（上下关系）
 *
 * @export
 * @class EditView4Engine
 * @extends {EditViewEngine}
 */
export declare class EditView4Engine extends EditViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<
     *     IAppDEEditView,
     *     IEditView4State,
     *     IEditView4Event
     *   >}
     * @memberof EditView4Engine
     */
    protected view: ViewController<IAppDEEditView, IEditView4State, IEditView4Event>;
    onCreated(): Promise<void>;
    /**
     * 数据分页栏
     *
     * @readonly
     * @memberof EditView4Engine
     */
    get drtab(): IDRTabController;
}
