import { IAppView } from '@ibiz/model-core';
import { IControlProvider, IModal, IModalData, IRedrawData, IUIActionResult, IUILogicParams, IViewEngine, IViewEvent, IViewLayoutPanelController } from '../../..';
import { ControllerEvent, ViewMsgController } from '../../../../controller/utils';
import { AppCounter } from '../../../../service';
import { IViewState } from '../../state';
import { IController } from '../i.controller';
/**
 * 视图控制器接口
 * @author lxm
 * @date 2023-05-04 01:36:05
 * @export
 * @interface IViewController
 * @extends {IController}
 */
export interface IViewController<T extends IAppView = IAppView, S extends IViewState = IViewState, E extends IViewEvent = IViewEvent> extends IController<T, S, E> {
    evt: ControllerEvent<E>;
    /**
     * 视图级共享数据对象
     *
     * @author chitanda
     * @date 2023-08-21 15:08:52
     * @type {IData}
     */
    session: IData;
    /**
     * 视图呈现模式
     * @author lxm
     * @date 2023-05-06 07:02:22
     * @type {IModal}
     */
    modal: IModal;
    /**
     * 视图错误信息
     *
     * @author tony001
     * @date 2024-04-28 11:04:07
     * @type {IData}
     */
    error: IData;
    /**
     * 插槽额外的输入props
     * 用来给对应插槽绘制补充额外的输入参数
     * @author lxm
     * @date 2023-05-26 03:48:17
     * @type {{ [key: string]: IData }}
     */
    slotProps: {
        [key: string]: IData;
    };
    /**
     * 所有部件的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IControlProvider }}
     */
    providers: {
        [key: string]: IControlProvider;
    };
    /**
     * 视图引擎集合
     * @author lxm
     * @date 2023-05-06 07:48:47
     * @type {IViewEngine[]}
     */
    engines: IViewEngine[];
    /**
     * 计数器集合
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: AppCounter }}
     */
    counters: {
        [key: string]: AppCounter;
    };
    /**
     * 上层视图控制器对象，顶层视图没有父
     * @author lxm
     * @date 2023-07-06 09:46:31
     * @type {(IViewController | undefined)}
     */
    readonly parentView: IViewController | undefined;
    /**
     * 视图是否处于激活状态
     * 激活态时，
     *
     * @author chitanda
     * @date 2023-07-12 17:07:57
     * @type {boolean}
     */
    readonly isActive: boolean;
    /**
     * 视图布局面板
     * @author lxm
     * @date 2023-07-31 08:54:08
     * @type {IViewLayoutPanelController}
     */
    layoutPanel?: IViewLayoutPanelController;
    /**
     * 视图消息控制器
     *
     * @author zhanghengfeng
     * @date 2024-05-09 16:05:58
     * @type {ViewMsgController}
     */
    viewMsgController?: ViewMsgController;
    /**
     * 关闭视图
     *
     * @author lxm
     * @date 2022-08-29 01:08:50
     */
    closeView(modalData?: IModalData): Promise<void>;
    /**
     * 重绘视图
     *
     * @param {IRedrawData} redrawData
     * @memberof IController
     */
    redrawView(redrawData: IRedrawData): void;
    /**
     * 执行视图的能力
     * @author lxm
     * @date 2023-05-08 10:30:36
     * @param {string} key 视图能力的唯一标识
     * @param {...any[]} args 视图能力需要的参数
     * @return {*}  {Promise<any>}
     */
    call<A extends IData>(key: string, args?: A): Promise<any>;
    /**
     * 执行视图预置界面行为能力
     * @author lxm
     * @date 2023-05-08 10:30:36
     * @param {string} key 预置界面行为tag标识
     * @param {...any[]} args 预置界面行为需要的参数
     * @return {*}  {Promise<any>}
     */
    callUIAction(key: string, args?: Partial<IUILogicParams>): Promise<IUIActionResult | null>;
    /**
     * 计算并处理视图上下文和视图参数
     * 已经渲染的视图会额外的触发视图刷新
     * @author lxm
     * @date 2023-05-24 12:19:06
     */
    handleContextParams(): void;
    /**
     * 开启视图loading
     *
     * @author lxm
     * @date 2022-09-19 14:09:00
     */
    startLoading(): void;
    /**
     *关闭视图loading
     *
     * @author lxm
     * @date 2022-09-19 14:09:09
     */
    endLoading(): void;
    /**
     * 视图激活，主要用于用户可见时设置为激活状态
     *
     * @author chitanda
     * @date 2023-12-13 11:12:04
     */
    onActivated(): void;
    /**
     * 视图暂停激活，主要用于用户不可见时设置为非激活状态
     *
     * @author chitanda
     * @date 2023-12-13 11:12:06
     */
    onDeactivated(): void;
}
//# sourceMappingURL=i-view.controller.d.ts.map