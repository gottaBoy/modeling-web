import { watch } from 'vue';

"use strict";
class RouteListener {
  constructor(route, wait) {
    /**
     * 回调集合
     *
     * @memberof RouteListener
     */
    this.callbacks = [];
    /**
     * 计时器集合
     *
     * @private
     * @type {any[]}
     * @memberof RouteListener
     */
    this.timers = [];
    /**
     * 等待路由响应时间
     *
     * @private
     * @type {number}
     * @memberof RouteListener
     */
    this.wait = 500;
    if (wait) {
      this.wait = wait;
    }
    watch(
      () => route.path,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (this.callbacks.length) {
            for (let index = 0; index < this.callbacks.length; index++) {
              const fn = this.callbacks[index];
              fn();
            }
          }
          this.callbacks = [];
          if (this.timers.length) {
            for (let index = 0; index < this.timers.length; index++) {
              const timer = this.timers[index];
              clearTimeout(timer);
            }
          }
          this.timers = [];
        }
      }
    );
  }
  /**
   * 下一次路由变更后执行回调，只执行一次
   *
   * @param {ChangeCallback} callback
   * @memberof RouteListener
   */
  nextChange(callback) {
    if (callback) {
      this.timers.push(
        setTimeout(() => {
          callback();
          const index = this.callbacks.findIndex((item) => item === callback);
          this.callbacks.splice(index, 1);
        }, this.wait)
      );
      this.callbacks.push(callback);
    }
  }
}

export { RouteListener };
