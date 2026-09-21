'use strict';

var lodashEs = require('lodash-es');
var vue = require('vue');
var appPopoverComponent = require('../app-popover/app-popover-component.cjs');
var appModalComponent = require('../app-modal/app-modal-component.cjs');
var appDrawerComponent = require('../app-drawer/app-drawer-component.cjs');
var appFloatWindowComponent = require('../app-float-window/app-float-window-component.cjs');

"use strict";
function resolveComponentOrStr(component) {
  return lodashEs.isString(component) ? vue.resolveComponent(component) : component;
}
class OverlayController {
  popover(element, component, props, opts) {
    const popover = this.createPopover(component, props, opts);
    popover.present(element);
    return popover.onWillDismiss();
  }
  createPopover(component, props, opts) {
    return appPopoverComponent.createPopover(
      lodashEs.isFunction(component) ? component : () => vue.h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
  drawer(component, props, opts) {
    const drawer = this.createDrawer(component, props, opts);
    drawer.present();
    return drawer.onWillDismiss();
  }
  createDrawer(component, props, opts) {
    return appDrawerComponent.createDrawer(
      lodashEs.isFunction(component) ? component : () => vue.h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
  async modal(component, props, opts) {
    const modal = this.createModal(component, props, opts);
    modal.present();
    return modal.onWillDismiss();
  }
  createModal(component, props, opts) {
    return appModalComponent.createModal(
      lodashEs.isFunction(component) ? component : () => vue.h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
  async floatWindow(component, props, opts) {
    const floatWindow = this.createFloatWindow(component, props, opts);
    floatWindow.present();
    return floatWindow.onWillDismiss();
  }
  createFloatWindow(component, props, opts) {
    return appFloatWindowComponent.createFloatWindow(
      lodashEs.isFunction(component) ? component : () => vue.h(resolveComponentOrStr(component), { ...props }),
      opts
    );
  }
}

exports.OverlayController = OverlayController;
