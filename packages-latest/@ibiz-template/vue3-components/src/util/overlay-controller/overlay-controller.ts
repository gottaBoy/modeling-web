import {
  IOverlayController,
  IDrawerOptions,
  IPopoverOptions,
  IModalOptions,
  IOverlayContainer,
  IOverlayPopoverContainer,
  IFloatWindowOptions,
} from '@ibiz-template/runtime';
import { isFunction, isString } from 'lodash-es';
import { h, resolveComponent, ConcreteComponent } from 'vue';
import {
  FloatingUIConfig,
  createPopover,
} from '../app-popover/app-popover-component';
import { createModal } from '../app-modal/app-modal-component';
import { createDrawer } from '../app-drawer/app-drawer-component';
import { createFloatWindow } from '../app-float-window/app-float-window-component';

function resolveComponentOrStr(component: unknown): string | ConcreteComponent {
  return isString(component)
    ? resolveComponent(component)
    : (component as ConcreteComponent);
}

/**
 * 用不同呈现方式绘制组件的通用工具类
 *
 * @author lxm
 * @date 2022-11-08 16:11:09
 * @export
 * @class OverlayController
 * @implements {IOverlayController}
 */
export class OverlayController implements IOverlayController {
  popover<T = void>(
    element: HTMLElement,
    component: unknown,
    props?: IParams,
    opts?: IPopoverOptions<FloatingUIConfig>,
  ): Promise<T> {
    const popover = this.createPopover(component, props, opts);
    popover.present(element);
    return popover.onWillDismiss();
  }

  createPopover(
    component: unknown,
    props?: IParams,
    opts?: IPopoverOptions<FloatingUIConfig>,
  ): IOverlayPopoverContainer {
    return createPopover(
      isFunction(component)
        ? component
        : () => h(resolveComponentOrStr(component), { ...props }),
      opts,
    );
  }

  drawer<T = void>(
    component: unknown,
    props?: IParams,
    opts?: IDrawerOptions,
  ): Promise<T> {
    const drawer = this.createDrawer(component, props, opts);
    drawer.present();
    return drawer.onWillDismiss();
  }

  createDrawer(
    component: unknown,
    props?: IParams,
    opts?: IDrawerOptions,
  ): IOverlayContainer {
    return createDrawer(
      isFunction(component)
        ? component
        : () => h(resolveComponentOrStr(component), { ...props }),
      opts,
    );
  }

  async modal<T = void>(
    component: unknown,
    props?: IParams,
    opts?: IModalOptions,
  ): Promise<T> {
    const modal = this.createModal(component, props, opts);
    modal.present();
    return modal.onWillDismiss();
  }

  createModal(
    component: unknown,
    props?: IParams,
    opts?: IModalOptions,
  ): IOverlayContainer {
    return createModal(
      isFunction(component)
        ? component
        : () => h(resolveComponentOrStr(component), { ...props }),
      opts,
    );
  }

  async floatWindow<T = void>(
    component: unknown,
    props?: IParams,
    opts?: IFloatWindowOptions,
  ): Promise<T> {
    const floatWindow = this.createFloatWindow(component, props, opts);
    floatWindow.present();
    return floatWindow.onWillDismiss();
  }

  createFloatWindow(
    component: unknown,
    props?: IParams,
    opts?: IFloatWindowOptions,
  ): IOverlayContainer {
    return createFloatWindow(
      isFunction(component)
        ? component
        : () => h(resolveComponentOrStr(component), { ...props }),
      opts,
    );
  }
}
