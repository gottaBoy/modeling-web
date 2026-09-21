import { Namespace } from '@ibiz-template/core';
import { IConfirmUtil, ConfirmParams } from '@ibiz-template/runtime';
import { ElMessageBox } from 'element-plus';

/**
 * 确认操作框
 *
 * @author chitanda
 * @date 2022-08-17 16:08:52
 * @export
 * @class ConfirmUtil
 * @implements {IConfirmUtil}
 */
export class ConfirmUtil implements IConfirmUtil {
  private ns = new Namespace('confirm');

  async info(params: ConfirmParams): Promise<boolean> {
    return new Promise(resolve => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: `${this.ns.b()} ${this.ns.e('info')}`,
        type: 'info',
        cancelButtonClass: `${this.ns.b('cancel')} el-button--info`,
        confirmButtonClass: `${this.ns.b('ok')}`,
        ...params.options,
      })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async success(params: ConfirmParams): Promise<boolean> {
    return new Promise(resolve => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: `${this.ns.b()} ${this.ns.e('success')}`,
        cancelButtonClass: `${this.ns.b('cancel')} el-button--info`,
        confirmButtonClass: `${this.ns.b('ok')}`,
        type: 'success',
        ...params.options,
      })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async warning(params: ConfirmParams): Promise<boolean> {
    return new Promise(resolve => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: `${this.ns.b()} ${this.ns.e('warning')}`,
        cancelButtonClass: `${this.ns.b('cancel')} el-button--info`,
        confirmButtonClass: `${this.ns.b('ok')}`,
        type: 'warning',
        ...params.options,
      })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async error(params: ConfirmParams): Promise<boolean> {
    return new Promise(resolve => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: `${this.ns.b()} ${this.ns.e('error')}`,
        cancelButtonClass: `${this.ns.b('cancel')} el-button--info`,
        confirmButtonClass: `${this.ns.b('ok')}`,
        type: 'error',
        ...params.options,
      })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }
}
