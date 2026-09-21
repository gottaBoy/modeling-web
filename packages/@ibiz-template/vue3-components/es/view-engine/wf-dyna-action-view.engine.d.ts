import { ViewController, IWFDynaActionViewState, IWFDynaActionViewEvent } from '@ibiz-template/runtime';
import { IAppDEWFDynaActionView } from '@ibiz/model-core';
import { WFDynaEditViewEngine } from './wf-dyna-edit-view.engine';
export declare class WFDynaActionViewEngine extends WFDynaEditViewEngine {
    /**
     * 视图控制器
     *
     * @protected
     * @type {ViewController<IAppDEWFDynaActionView, IWFDynaActionViewState, IWFDynaActionViewEvent>}
     * @memberof WFDynaActionViewEngine
     */
    protected view: ViewController<IAppDEWFDynaActionView, IWFDynaActionViewState, IWFDynaActionViewEvent>;
    isCalcWFToolbar: boolean;
    calcProcessFormName(): Promise<string>;
    call(key: string, args: any): Promise<IData | null | undefined>;
    /**
     * 确认按钮回调
     *
     * @author lxm
     * @date 2022-09-12 20:09:13
     */
    onOkButtonClick(): Promise<void>;
    /**
     * 取消按钮回调
     *
     * @author lxm
     * @date 2022-09-12 20:09:00
     */
    onCancelButtonClick(): Promise<void>;
}
