/* eslint-disable no-await-in-loop */
import { AsyncSeriesHook } from 'qx-util';
import { ViewMode } from '../../constant';
import { IModal, IModalData } from '../../interface';

type ConstructorOpts = {
  mode?: ViewMode;
  routeDepth?: number;
  viewUsage?: number;
  /**
   * 注入的模态等组件实际的关闭操作，
   * @author lxm
   * @date 2023-05-12 07:04:21
   */
  dismiss?: (data: IModalData) => void;
};
export class Modal implements IModal {
  mode: ViewMode = ViewMode.EMBED;

  routeDepth?: number;

  viewUsage: number = 4;

  ignoreDismissCheck: boolean = false;

  hooks = {
    preDismiss: new AsyncSeriesHook<[], { allowNext?: boolean }>(),
    shouldDismiss: new AsyncSeriesHook<[], { allowClose?: boolean }>(),
    beforeDismiss: new AsyncSeriesHook<[], IModalData>(),
  };

  constructor(opts: ConstructorOpts) {
    if (opts.mode) {
      this.mode = opts.mode;
    }
    if (opts.routeDepth) {
      this.routeDepth = opts.routeDepth;
    }
    if (opts.viewUsage) {
      this.viewUsage = opts.viewUsage;
    }
    if (opts.dismiss) {
      this._dismiss = opts.dismiss;
    }
  }

  /**
   * 外部注入的模态等组件实际的关闭操作
   * @author lxm
   * @date 2023-05-12 07:06:56
   */
  _dismiss = (data: IModalData): void => {
    ibiz.log.error(
      ibiz.i18n.t('runtime.utils.modal.externalClosureCapability'),
      data,
    );
  };

  /**
   * 注入模态等组件实际的关闭操作
   * @author lxm
   * @date 2023-07-18 03:05:22
   * @param {(data: IModalData) => void} dismiss
   */
  injectDismiss(dismiss: (data: IModalData) => void): void {
    this._dismiss = dismiss;
  }

  async dismiss(data: IModalData = { ok: false, data: [] }): Promise<boolean> {
    const context: IData = {};

    // 关闭前执行操作
    await this.hooks.preDismiss.call(context);
    if (context.allowNext === false) {
      return false;
    }

    if (this.ignoreDismissCheck !== true) {
      // 判断是否执行关闭
      await this.hooks.shouldDismiss.call(context);
    }
    if (context.allowClose === false) {
      ibiz.log.debug(ibiz.i18n.t('runtime.utils.modal.shouldDismissResult'));
      return false;
    }

    // 执行关闭前操作
    await this.hooks.beforeDismiss.call(data);

    // 执行实际关闭操作
    this._dismiss(data);
    this.destroy();
    return true;
  }

  /**
   * 执行完一次关闭后就会调销毁
   * @author lxm
   * @date 2023-07-18 03:32:26
   * @protected
   */
  protected destroy(): void {
    this.hooks.preDismiss.clear();
    this.hooks.shouldDismiss.clear();
    this.hooks.beforeDismiss.clear();
  }
}
