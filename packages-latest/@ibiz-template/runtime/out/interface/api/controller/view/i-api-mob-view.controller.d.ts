import { IAppMobView } from '@ibiz/model-core';
import { IApiViewState } from '../../state';
import { IApiViewController } from './i-api-view.controller';
/**
 * @description 移动端视图控制器接口
 * @export
 * @interface IApiMobViewController
 * @extends {IApiViewController<T>}
 * @template T
 */
export interface IApiMobViewController<T extends IAppMobView = IAppMobView, S extends IApiViewState = IApiViewState> extends IApiViewController<T, S> {
}
//# sourceMappingURL=i-api-mob-view.controller.d.ts.map