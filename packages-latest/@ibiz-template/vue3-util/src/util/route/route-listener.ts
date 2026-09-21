/* eslint-disable @typescript-eslint/no-explicit-any */
import { watch } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

type ChangeCallback = () => void;
/**
 * 监听路由变更，提供下一次变更执行的一次性回调。
 *
 * @export
 * @class RouteListener
 */
export class RouteListener {
  /**
   * 回调集合
   *
   * @memberof RouteListener
   */
  private callbacks: Array<ChangeCallback> = [];

  /**
   * 计时器集合
   *
   * @private
   * @type {any[]}
   * @memberof RouteListener
   */
  private timers: any[] = [];

  /**
   * 等待路由响应时间
   *
   * @private
   * @type {number}
   * @memberof RouteListener
   */
  private wait: number = 500;

  constructor(route: RouteLocationNormalizedLoaded, wait?: number) {
    if (wait) {
      this.wait = wait;
    }
    watch(
      () => route.path,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 执行所有回调
          if (this.callbacks.length) {
            for (let index = 0; index < this.callbacks.length; index++) {
              const fn = this.callbacks[index];
              fn();
            }
          }
          // 清空所有回调
          this.callbacks = [];

          // 清空所有计时器
          if (this.timers.length) {
            for (let index = 0; index < this.timers.length; index++) {
              const timer = this.timers[index];
              clearTimeout(timer);
            }
          }

          this.timers = [];
        }
      },
    );
  }

  /**
   * 下一次路由变更后执行回调，只执行一次
   *
   * @param {ChangeCallback} callback
   * @memberof RouteListener
   */
  nextChange(callback: ChangeCallback): void {
    if (callback) {
      // 设定计时器,经过一段时间等不到时，执行回调，并删除回调集合里的回调
      this.timers.push(
        setTimeout(() => {
          callback();
          const index = this.callbacks.findIndex(item => item === callback);
          this.callbacks.splice(index, 1);
        }, this.wait),
      );

      // 存入回调集合等待被调用
      this.callbacks.push(callback);
    }
  }
}
