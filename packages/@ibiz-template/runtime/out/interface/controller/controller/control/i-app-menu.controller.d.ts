import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { IAppMenuEvent } from '../../event';
import { IAppMenuState } from '../../state';
import { IControlController } from './i-control.controller';
/**
 * 应用菜单控制器
 * @author lxm
 * @date 2023-05-04 02:58:18
 * @export
 * @interface IAppMenuController
 * @extends {IControlController}
 */
export interface IAppMenuController extends IControlController<IAppMenu, IAppMenuState, IAppMenuEvent> {
    /**
     * 所有菜单项
     *
     * @type {[]}
     * @memberof IAppMenuController
     */
    allAppMenuItems: IAppMenuItem[];
}
//# sourceMappingURL=i-app-menu.controller.d.ts.map