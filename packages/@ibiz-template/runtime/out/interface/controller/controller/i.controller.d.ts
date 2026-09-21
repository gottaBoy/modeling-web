import { IModelObject } from '@ibiz/model-core';
import { ControllerEvent } from '../../../controller/utils';
import { IComponentEvent } from '../event';
import { IEnforceableController } from './common';
import { IViewLayoutPanelController } from './control';
import { IViewController } from './view';
/**
 * 视图，部件控制器基类
 * @author lxm
 * @date 2023-04-25 09:56:33
 * @export
 * @interface IController
 */
export interface IController<T extends IModelObject = IModelObject, S extends object = object, E extends IComponentEvent = IComponentEvent> extends IEnforceableController {
    /**
     * 控制器实例的唯一标识,创建时自动生成
     *
     * @author chitanda
     * @date 2023-12-22 15:12:18
     * @type {string}
     */
    readonly id: string;
    /**
     * UI状态
     *
     */
    state: S;
    /**
     * 模型对象
     * @author lxm
     * @date 2023-05-04 01:29:07
     * @type {T}
     */
    readonly model: T;
    /**
     * 事件触发器
     * @author lxm
     * @date 2023-04-25 09:57:40
     * @type {ControllerEvent}
     */
    evt: ControllerEvent<E>;
    /**
     * 视图上下文
     *
     * @author chitanda
     * @date 2022-07-24 17:07:46
     * @type {IContext}
     */
    readonly context: IContext;
    /**
     * 视图参数
     *
     * @author chitanda
     * @date 2022-07-24 17:07:55
     * @type {IParams}
     */
    readonly params: IParams;
    /**
     * 子组件的名称，会监听指定子组件的生命周期，影响自身的声明周期。
     * @author lxm
     * @date 2023-04-26 08:10:57
     * @type {string[]}
     */
    childNames: string[];
    /**
     * 视图布局面板控制器
     * @author lxm
     * @date 2023-07-31 08:54:08
     * @type {IViewLayoutPanelController}
     */
    layoutPanel?: IViewLayoutPanelController;
    /**
     * 获取指定名称的控制器
     * @author lxm
     * @date 2023-04-25 10:14:42
     * @param {string} name
     * @param {boolean} [traceRoot=false] 是否跨越视图作用域，一路向根上找。
     * @return {*}  {(BaseController | undefined)}
     */
    getController(name: string, traceRoot?: boolean): IController | undefined;
    /**
     * 获取顶级视图的控制器
     * @author lxm
     * @date 2023-07-14 01:14:37
     * @return {*}  {IViewController}
     */
    getTopView(): IViewController;
    /**
     * 生命周期-创建完成
     * @author lxm
     * @date 2023-04-25 11:08:54
     */
    created(): Promise<void>;
    /**
     * 生命周期-销毁完成
     * @author lxm
     * @date 2023-04-25 11:08:54
     */
    destroyed(): Promise<void>;
}
//# sourceMappingURL=i.controller.d.ts.map