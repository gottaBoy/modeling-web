import { IOverlayController, IDrawerOptions, IPopoverOptions, IModalOptions, IOverlayContainer, IOverlayPopoverContainer, IFloatWindowOptions } from '@ibiz-template/runtime';
import { FloatingUIConfig } from '../app-popover/app-popover-component';
/**
 * 用不同呈现方式绘制组件的通用工具类
 *
 * @author lxm
 * @date 2022-11-08 16:11:09
 * @export
 * @class OverlayController
 * @implements {IOverlayController}
 */
export declare class OverlayController implements IOverlayController {
    popover<T = void>(element: HTMLElement, component: unknown, props?: IParams, opts?: IPopoverOptions<FloatingUIConfig>): Promise<T>;
    createPopover(component: unknown, props?: IParams, opts?: IPopoverOptions<FloatingUIConfig>): IOverlayPopoverContainer;
    drawer<T = void>(component: unknown, props?: IParams, opts?: IDrawerOptions): Promise<T>;
    createDrawer(component: unknown, props?: IParams, opts?: IDrawerOptions): IOverlayContainer;
    modal<T = void>(component: unknown, props?: IParams, opts?: IModalOptions): Promise<T>;
    createModal(component: unknown, props?: IParams, opts?: IModalOptions): IOverlayContainer;
    floatWindow<T = void>(component: unknown, props?: IParams, opts?: IFloatWindowOptions): Promise<T>;
    createFloatWindow(component: unknown, props?: IParams, opts?: IFloatWindowOptions): IOverlayContainer;
}
