import { IPanel } from '@ibiz/model-core';
import { AsyncSeriesHook } from 'qx-util';
import { IPanelEvent } from '../../event';
import { IPanelState } from '../../state';
import { IControlController } from './i-control.controller';
import { IPanelItemController } from './panel-item';
import { IController } from '../i.controller';
/**
 * 面板控制器
 * @author lxm
 * @date 2023-05-04 03:00:27
 * @export
 * @interface IPanelController
 * @extends {IControlController}
 */
export interface IPanelController<T extends IPanel = IPanel, S extends IPanelState = IPanelState, E extends IPanelEvent = IPanelEvent> extends IControlController<T, S, E> {
    /**
     * 钩子
     *
     * @type {{
     *     validate: AsyncSeriesHook<[], { result: boolean[]; parentId?: string }>;
     *   }}
     * @memberof IPanelController
     */
    hooks: {
        validate: AsyncSeriesHook<[], {
            result: boolean[];
            parentId?: string;
        }>;
    };
    /**
     * 所有面板成员的控制器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPanelItemController }}
     */
    panelItems: {
        [key: string]: IPanelItemController;
    };
    /**
     * 面板数据
     * @author lxm
     * @date 2023-07-15 11:36:58
     * @type {IData}
     */
    data: IData;
    /**
     * 容器控制器（可能是视图控制器，也可能是部件控制器）
     * @author lxm
     * @date 2023-11-21 07:41:31
     * @type {(IController)}
     */
    container?: IController;
    /**
     * 部件加载
     *
     * @author lxm
     * @date 2023-02-10 01:46:24
     * @memberof IPanelController
     */
    load(): Promise<void>;
    /**
     * 值校验
     *
     * @param {string} [parentId] 数据父容器标识
     * @return {*}  {Promise<boolean>}
     * @memberof IPanelController
     */
    validate(parentId?: string): Promise<boolean>;
    /**
     * 设置面板数据的值
     *
     * @param {string} name 要设置的数据的属性名称
     * @param {unknown} value 要设置的值
     */
    setDataValue(name: string, value: unknown): Promise<void>;
}
//# sourceMappingURL=i-panel.controller.d.ts.map