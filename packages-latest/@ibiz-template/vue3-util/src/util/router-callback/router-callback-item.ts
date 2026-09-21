import { IModalData } from '@ibiz-template/runtime';

/**
 * 路由视图关闭回调
 *
 * @author chitanda
 * @date 2023-07-13 21:07:51
 * @export
 * @class RouterCallbackItem
 */
export class RouterCallbackItem {
  protected resolve?: (modal: IModalData) => void;

  protected promise?: Promise<IModalData>;

  /**
   * 销毁定时器
   *
   * @author chitanda
   * @date 2023-07-13 21:07:51
   * @type {number}
   */
  timeout?: number;

  /**
   * 是否已经有打开的视图认领此回调，如果在一定时间内没有被认领，则会被清除
   *
   * @author chitanda
   * @date 2023-07-13 21:07:35
   */
  isActivated = false;

  constructor(
    public from: string,
    public to: string,
  ) {
    ibiz.log.debug('openRouter: ', from, to);
  }

  /**
   * 等待视图关闭
   *
   * @author chitanda
   * @date 2023-07-13 21:07:34
   * @return {*}  {Promise<IModalData>}
   */
  onWillDismiss(): Promise<IModalData> {
    if (!this.promise) {
      this.promise = new Promise(resolve => {
        this.resolve = resolve;
      });
    }
    return this.promise.then(modal => {
      ibiz.log.debug('onWillDismiss: ', this.from, this.to, modal);
      return modal;
    });
  }

  /**
   * 关闭视图
   *
   * @author chitanda
   * @date 2023-07-13 21:07:06
   * @param {IModalData} modal
   */
  close(modal: IModalData): void {
    ibiz.log.debug('closeRouter: ', this.from, this.to, modal);
    if (this.resolve) {
      this.resolve(modal);
      this.resolve = undefined;
    }
  }

  /**
   * 激活回调
   *
   * @author chitanda
   * @date 2023-07-13 21:07:29
   */
  active(): void {
    ibiz.log.debug('activeRouter: ', this.from, this.to);
    this.isActivated = true;
  }

  /**
   * 销毁回调
   *
   * @author chitanda
   * @date 2023-07-13 21:07:21
   */
  destroy(): void {
    ibiz.log.debug('destroyRouter: ', this.from, this.to);
    if (this.resolve) {
      this.resolve({ ok: false });
      this.resolve = undefined;
    }
  }
}
