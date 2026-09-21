import { isString, isFunction } from 'lodash-es';
import { resolveComponent, h } from 'vue';
import { createPopover } from '../app-popover/app-popover-component.mjs';
import { createModal } from '../app-modal/app-modal-component.mjs';
import { createDrawer } from '../app-drawer/app-drawer-component.mjs';
import { createFloatWindow } from '../app-float-window/app-float-window-component.mjs';

"use strict";
function resolveComponentOrStr(component) {
  return isString(component) ? resolveComponent(component) : component;
}
class OverlayController {
  popover(element, component, props, opts) {
    const popover = this.createPopover(component, props, opts);
    popover.present(element);
    return popover.onWillDismiss();
  }
  createPopover(component, props, opts) {
    return createPopover(
      isFunction(component) ? component : () => h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
  drawer(component, props, opts) {
    const drawer = this.createDrawer(component, props, opts);
    drawer.present();
    return drawer.onWillDismiss();
  }
  createDrawer(component, props, opts) {
    return createDrawer(
      isFunction(component) ? component : () => h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
  async modal(component, props, opts) {
    const modal = this.createModal(component, props, opts);
    modal.present();
    return modal.onWillDismiss();
  }
  createModal(component, props, opts) {
    return createModal(
      isFunction(component) ? component : () => h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
  async floatWindow(component, props, opts) {
    const floatWindow = this.createFloatWindow(component, props, opts);
    floatWindow.present();
    return floatWindow.onWillDismiss();
  }
  createFloatWindow(component, props, opts) {
    return createFloatWindow(
      isFunction(component) ? component : () => h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
}

export { OverlayController };
