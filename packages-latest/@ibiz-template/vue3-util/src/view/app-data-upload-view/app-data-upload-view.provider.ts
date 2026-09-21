import {
  AppDataUploadViewController,
  CTX,
  IViewController,
  IViewEvent,
  IViewProvider,
  IViewState,
} from '@ibiz-template/runtime';
import { IAppView } from '@ibiz/model-core';

/**
 * 应用导入视图适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class ViewProvider
 * @implements {IViewProvider}
 */
export class AppDataUploadViewProvider implements IViewProvider {
  component: string = 'IBizView';

  createController(
    model: IAppView,
    context: IContext,
    params?: IParams | undefined,
    ctx?: CTX<IViewController<IAppView, IViewState, IViewEvent>> | undefined,
  ): IViewController<IAppView, IViewState, IViewEvent> {
    return new AppDataUploadViewController(model, context, params, ctx);
  }
}
