/**
 * 计数器对象
 *
 * @author lxm
 * @date 2022-09-19 11:09:36
 * @export
 * @class Counter
 */
export class Counter {
  /**
   * 计数
   *
   * @author lxm
   * @date 2022-09-19 11:09:30
   * @type {number}
   */
  count: number = 0;

  /**
   * 计数器状态
   * 调用过一次回调后就会变为使用过的状态，任何操作都不会执行
   *
   * @author lxm
   * @date 2022-09-21 19:09:21
   * @private
   * @type {('Unused' | 'Used')}
   */
  protected state: 'Unused' | 'Used' = 'Unused';

  /**
   * 是否可以重复使用
   *
   * @author lxm
   * @date 2022-09-21 19:09:22
   * @protected
   * @type {boolean}
   */
  protected reusable: boolean = true;

  /**
   * Creates an instance of Counter.
   * @author lxm
   * @date 2022-09-19 11:09:57
   * @param {() => void} callback 回调函数，在计数归零的时候被调用
   */
  constructor(private callback: () => void) {}

  /**
   * 增加计数，返回增加后的计数
   *
   * @author lxm
   * @date 2022-08-18 21:08:22
   */
  increment(): number {
    if (this.state === 'Used') {
      return this.count;
    }
    this.count += 1;
    return this.count;
  }

  /**
   * 减少计数，当计数为0时触发回调
   *
   * @author lxm
   * @date 2022-08-18 21:08:22
   */
  decrement(callback2?: () => void): void {
    if (this.state === 'Used') {
      return;
    }
    if (this.count === 0) {
      ibiz.log.warn(ibiz.i18n.t('runtime.controller.utils.counter.decrement'));
      return;
    }
    this.count -= 1;
    if (this.count === 0) {
      if (callback2) {
        callback2();
      } else if (this.callback) {
        this.callback();
      }
      if (!this.reusable) {
        this.state = 'Used';
      }
    }
  }

  /**
   * 销毁方法，解除关联
   *
   * @author lxm
   * @date 2022-09-19 11:09:27
   */
  destroy(): void {
    this.callback = undefined as never;
  }
}
