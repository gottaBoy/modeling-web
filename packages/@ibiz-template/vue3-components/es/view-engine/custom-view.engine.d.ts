import { IViewController, ViewEngineBase, IViewEvent, IViewState } from '@ibiz-template/runtime';
import { IAppDECustomView } from '@ibiz/model-core';
export declare class CustomViewEngine extends ViewEngineBase {
    protected view: IViewController<IAppDECustomView, IViewState, IViewEvent>;
    /**
     * 执行视图预置界面行为能力
     *
     * @param {string} key
     * @param {*} args
     * @return {*}  {(Promise<IData | null | undefined>)}
     * @memberof CustomViewEngine
     */
    call(key: string, args: any): Promise<IData | null | undefined>;
}
