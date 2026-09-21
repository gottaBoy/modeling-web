import { Counter } from './counter';

/**
 * 活动计数器
 *
 * @author lxm
 * @date 2022-09-21 18:09:53
 * @export
 * @class NerveCounter
 * @extends {Counter}
 */
export class ActivityCounter extends Counter {
  protected reusable: boolean = false;

  /**
   * 登记情况，记录了登记的名称和是否已经出席
   *
   * @author lxm
   * @date 2022-09-21 18:09:27
   * @type {string[]}
   */
  registration: Map<string, boolean> = new Map();

  /**
   * 登记要等待的名称
   *
   * @author lxm
   * @date 2022-09-21 18:09:01
   * @param {string} name
   */
  enroll(name: string): void {
    // 当计数器未触发之前才可以登记入册
    if (this.state === 'Unused' && !this.registration.has(name)) {
      this.registration.set(name, false);
      this.increment();
    }
  }

  /**
   * 出席，只有登记了的名称才能出席，当所有登记的名称出席后计数器结束，触发回调
   *
   * @author lxm
   * @date 2022-09-21 18:09:09
   * @param {string} name
   */
  attend(name: string): void {
    // 在名称集合内，且未false时
    if (this.registration.has(name) && this.registration.get(name) === false) {
      this.registration.set(name, true);
      this.decrement();
    }
  }
}
