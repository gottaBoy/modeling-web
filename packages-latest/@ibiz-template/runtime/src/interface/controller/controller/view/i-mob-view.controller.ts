import { IAppMobView } from '@ibiz/model-core';
import { IViewController } from './i-view.controller';
import { IApiMobViewController, IViewState } from '../../..';

/**
 * @description 移动端视图控制器接口
 * @export
 * @interface IMobViewController
 * @extends {IViewController<IAppMobView>}
 */
export interface IMobViewController
  extends IViewController<IAppMobView, IViewState>,
    IApiMobViewController<IAppMobView, IViewState> {}
