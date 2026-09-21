import { ViewController, IWFDynaEditView3State, IWFDynaEditView3Event, IDRTabController } from '@ibiz-template/runtime';
import { IAppDEWFDynaEditView } from '@ibiz/model-core';
import { WFDynaEditViewEngine } from './wf-dyna-edit-view.engine';
export declare class WFDynaEditView3Engine extends WFDynaEditViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEWFDynaEditView3, IWFDynaEditView3State, IWFDynaEditView3Event>}
     * @memberof WFDynaEditView3Engine
     */
    protected view: ViewController<IAppDEWFDynaEditView, IWFDynaEditView3State, IWFDynaEditView3Event>;
    onCreated(): Promise<void>;
    /**
     * 数据分页栏
     *
     * @readonly
     * @memberof EditView3Engine
     */
    get drtab(): IDRTabController;
}
