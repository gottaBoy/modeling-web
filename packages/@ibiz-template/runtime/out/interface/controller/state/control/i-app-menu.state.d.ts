import { IAppMenuItem } from '@ibiz/model-core';
import { IControlState } from './i-control.state';
export interface IAppMenuState extends IControlState {
    /**
     * 菜单项状态
     *
     * @author lxm
     * @date 2022-10-12 20:10:51
     * @type {{ [p: string]: { visible: boolean; permitted: boolean } }}
     */
    menuItemsState: {
        [p: string]: {
            visible: boolean;
            permitted: boolean;
        };
    };
    /**
     * 移动端菜单项集合
     *
     * @type {IAppMenuItem[]}
     * @memberof IAppMenuState
     */
    mobMenuItems: IAppMenuItem[];
}
//# sourceMappingURL=i-app-menu.state.d.ts.map