import { QXEvent } from 'qx-util';
import { h } from 'vue';
import { RuntimeError } from '@ibiz-template/core';
import { isElement } from 'lodash-es';

"use strict";
class OverlayContainer {
  /**
   * 创建全局呈现
   *
   * @author chitanda
   * @date 2022-11-09 14:11:52
   * @param {unknown} component
   * @param {(h: CreateElement) => VNode} render
   * @param {IPopoverOptions} [opts]
   */
  constructor(component, render, opts) {
    this.component = component;
    this.render = render;
    this.opts = opts;
    /**
     * 内部事件
     *
     * @author chitanda
     * @date 2022-11-09 12:11:42
     * @protected
     */
    this.evt = new QXEvent();
    this.init();
  }
  static createVueApp(_rootComponent, _rootProps) {
    throw new RuntimeError(ibiz.i18n.t("vue3Util.util.noInjected"));
  }
  /**
   * 初始化飘窗
   *
   * @author chitanda
   * @date 2022-11-09 12:11:55
   * @protected
   * @return {*}  {void}
   */
  init() {
    const self = this;
    const { render, opts } = this;
    const container = document.createElement("div");
    let appendTo = document.body;
    if (isElement(opts == null ? void 0 : opts.appendTo)) {
      appendTo = opts == null ? void 0 : opts.appendTo;
    }
    appendTo.appendChild(container);
    const vm = OverlayContainer.createVueApp({
      mounted() {
        self.modal = this.$refs.root;
      },
      unmounted() {
        appendTo.removeChild(container);
        self.evt.emit("dismiss", self.result);
      },
      render() {
        return h(
          self.component,
          {
            ref: "root",
            opts,
            onDismiss(data) {
              self.result = data;
              vm.unmount();
            }
          },
          { default: render }
        );
      }
    });
    ibiz.plugin.register(vm);
    vm.mount(container);
    this.vm = vm;
  }
  /**
   * 打开飘窗
   *
   * @author chitanda
   * @date 2022-11-09 12:11:52
   * @param {HTMLElement} target
   * @return {*}  {Promise<void>}
   */
  async present() {
    return this.modal.present();
  }
  /**
   * 手动调用关闭飘窗
   *
   * @author chitanda
   * @date 2022-11-09 12:11:39
   * @param {unknown} [data]
   * @return {*}  {Promise<void>}
   */
  async dismiss(data) {
    await this.modal.dismiss(data);
  }
  /**
   * 订阅窗口关闭
   *
   * @author chitanda
   * @date 2022-11-09 12:11:20
   * @template T
   * @return {*}  {Promise<T>}
   */
  async onWillDismiss() {
    return new Promise((resolve) => {
      const callback = (data) => {
        resolve(data);
        this.evt.off("dismiss", callback);
      };
      this.evt.on("dismiss", callback);
    });
  }
}

export { OverlayContainer };
