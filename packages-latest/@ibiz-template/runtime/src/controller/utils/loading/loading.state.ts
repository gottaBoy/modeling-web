import { NOOP } from '@ibiz-template/core';
import { Counter } from '../counter/counter';

/**
 * loading状态控制类
 *
 * @author lxm
 * @date 2022-09-19 11:09:35
 * @export
 * @class LoadingState
 */
export class LoadingState {
  /**
   * 当前的loading状态，多次loading叠加时，只有所有loading都结束才会变回false。
   *
   * @author lxm
   * @date 2022-09-19 11:09:43
   * @readonly
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * loading计数器
   *
   * @author lxm
   * @date 2022-09-19 11:09:08
   * @private
   */
  private counter = new Counter(NOOP);

  /**
   * 开始loading
   *
   * @author lxm
   * @date 2022-09-19 11:09:55
   */
  begin(): void {
    this.isLoading = true;
    this.counter.increment();
  }

  /**
   * 结束loading
   *
   * @author lxm
   * @date 2022-09-19 11:09:34
   */
  end(): void {
    this.counter.decrement(() => {
      this.isLoading = false;
    });
  }
}
