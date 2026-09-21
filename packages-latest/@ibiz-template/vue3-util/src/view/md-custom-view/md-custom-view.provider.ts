import {
  CTX,
  IMDCustomViewState,
  IViewController,
  IViewEvent,
  IViewProvider,
  MDCustomViewController,
} from '@ibiz-template/runtime';
import { IAppDECustomView } from '@ibiz/model-core';

/**
 * @description 实体多数据自定义视图适配器
 * @export
 * @class MDCustomViewProvider
 * @implements {IViewProvider}
 */
export class MDCustomViewProvider implements IViewProvider {
  component: string = 'IBizView';

  createController(
    model: IAppDECustomView,
    context: IContext,
    params?: IParams | undefined,
    ctx?:
      | CTX<IViewController<IAppDECustomView, IMDCustomViewState, IViewEvent>>
      | undefined,
  ): IViewController<IAppDECustomView, IMDCustomViewState, IViewEvent> {
    return new MDCustomViewController(model, context, params, ctx);
  }
}
