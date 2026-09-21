/* eslint-disable no-await-in-loop */
import { AsyncSeriesHook } from 'qx-util';
import { ViewMode } from '../../constant';
export class Modal {
    constructor(opts) {
        this.mode = ViewMode.EMBED;
        this.viewUsage = 4;
        this.ignoreDismissCheck = false;
        this.hooks = {
            preDismiss: new AsyncSeriesHook(),
            shouldDismiss: new AsyncSeriesHook(),
            beforeDismiss: new AsyncSeriesHook(),
        };
        /**
         * 外部注入的模态等组件实际的关闭操作
         * @author lxm
         * @date 2023-05-12 07:06:56
         */
        this._dismiss = (data) => {
            ibiz.log.error(ibiz.i18n.t('runtime.utils.modal.externalClosureCapability'), data);
        };
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
     * 注入模态等组件实际的关闭操作
     * @author lxm
     * @date 2023-07-18 03:05:22
     * @param {(data: IModalData) => void} dismiss
     */
    injectDismiss(dismiss) {
        this._dismiss = dismiss;
    }
    async dismiss(data = { ok: false, data: [] }) {
        const context = {};
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
    destroy() {
        this.hooks.preDismiss.clear();
        this.hooks.shouldDismiss.clear();
        this.hooks.beforeDismiss.clear();
    }
}
