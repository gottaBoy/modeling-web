import { IExpBar } from '@ibiz/model-core';
import { INavViewMsg } from '../../common';
import { IExpBarControlEvent } from '../../event';
import { IExpBarControlState } from '../../state';
import { IControlController } from './i-control.controller';
import { IMDControlController } from './i-md-control.controller';
import { IToolbarController } from './i-toolbar.controller';
/**
 * 导航栏控制器
 * @author zk
 * @date 2023-05-04 01:47:16
 * @export
 * @interface IExpBarControlController
 * @extends {IControlController}
 */
export interface IExpBarControlController<T extends IExpBar = IExpBar, S extends IExpBarControlState = IExpBarControlState, E extends IExpBarControlEvent = IExpBarControlEvent> extends IControlController<T, S, E> {
    /**
     * 多数据部件控制器
     *
     * @author zk
     * @date 2023-05-29 03:05:07
     * @readonly
     * @memberof IExpBarControlController
     */
    xDataController: IMDControlController;
    /**
     * 工具栏控制器
     *
     * @author zk
     * @date 2023-05-29 03:05:07
     * @readonly
     * @memberof IExpBarControlController
     */
    toolbarController: IToolbarController | undefined;
    /**
     * 导航栏加载
     *
     * @author zk
     * @date 2023-05-29 04:05:30
     * @return {*}  {Promise<void>}
     * @memberof IExpBarControlController
     */
    load(): Promise<IData[]>;
    /**
     * 获取导航视图消息
     *
     * @author zk
     * @date 2023-08-04 08:08:27
     * @param {IData[]} data
     * @return {*}  {(INavViewMsg | undefined)}
     * @memberof ITreeExpBarController
     */
    getNavViewMsg(data: IData, context: IContext, params: IParams): INavViewMsg;
    /**
     * 路由变更处理回调
     * @author lxm
     * @date 2023-09-14 07:03:39
     * @param {{ srfnav?: string; path: string }} info 当前系统的路由的从一级到最后一级的所有路径。
     */
    onRouterChange(info: {
        srfnav: string;
        path: string;
    }): Promise<void>;
}
//# sourceMappingURL=i-exp-bar-control.controller.d.ts.map