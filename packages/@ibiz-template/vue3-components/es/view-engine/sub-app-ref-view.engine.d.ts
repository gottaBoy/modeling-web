import { ISubAppRefViewEvent, ISubAppRefViewState, ViewController, ViewEngineBase } from '@ibiz-template/runtime';
import { IAppDESubAppRefView } from '@ibiz/model-core';
export declare class SubAppRefViewEngine extends ViewEngineBase {
    /**
     * 视图控制器
     *
     * @protected
     * @memberof WizardViewEngine
     */
    protected view: ViewController<IAppDESubAppRefView, ISubAppRefViewState, ISubAppRefViewEvent>;
}
