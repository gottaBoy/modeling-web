import { CTX, IMDCustomViewState, IViewController, IViewEvent, IViewProvider } from '@ibiz-template/runtime';
import { IAppDECustomView } from '@ibiz/model-core';
/**
 * @description 实体多数据自定义视图适配器
 * @export
 * @class MDCustomViewProvider
 * @implements {IViewProvider}
 */
export declare class MDCustomViewProvider implements IViewProvider {
    component: string;
    createController(model: IAppDECustomView, context: IContext, params?: IParams | undefined, ctx?: CTX<IViewController<IAppDECustomView, IMDCustomViewState, IViewEvent>> | undefined): IViewController<IAppDECustomView, IMDCustomViewState, IViewEvent>;
}
//# sourceMappingURL=md-custom-view.provider.d.ts.map