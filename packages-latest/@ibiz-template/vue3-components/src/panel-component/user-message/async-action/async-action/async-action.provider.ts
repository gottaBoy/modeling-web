import { IPortalAsyncAction } from '@ibiz-template/core';
import { IAsyncActionProvider, IModal } from '@ibiz-template/runtime';
import { VNode, h } from 'vue';
import { isNil, isObject } from 'lodash-es';
import { AsyncActionPreview } from '../async-action-preview/async-action-preview';
import { AsyncActionResult } from '../async-action-result/async-action-result';
import { AsyncDataExport } from '../async-data-export/async-data-export';
import { AsyncAction } from './async-action';

export class AsyncActionProvider implements IAsyncActionProvider {
  component = AsyncAction;

  render(props: IData & { action: IPortalAsyncAction }): VNode {
    return h(this.component, {
      provider: this,
      ...props,
    });
  }

  async onClick(
    asyncAction: IPortalAsyncAction,
    _event: MouseEvent,
  ): Promise<boolean> {
    if (isNil(asyncAction.actiontype)) {
      ibiz.overlay.modal(
        (modal: IModal) => {
          return h(AsyncActionResult, {
            asyncAction,
            modal,
          });
        },
        {},
        { width: '80%', height: '80%' },
      );
      return true;
    }
    // 导出数据
    if (asyncAction.actiontype === 'DEEXPORTDATA') {
      ibiz.overlay.modal(
        (modal: IModal) => {
          return h(AsyncDataExport, {
            asyncAction,
            modal,
          });
        },
        {},
        { width: '80%', height: '80%' },
      );
      return true;
    }
    // 导入数据，actionresult有值且是对象时才能打开详情页面
    if (isObject(asyncAction.actionresult)) {
      ibiz.overlay.modal(
        (modal: IModal) => {
          return h(AsyncActionPreview, {
            asyncAction,
            modal,
          });
        },
        {},
        { width: '80%', height: '80%' },
      );
      return true;
    }
    return false;
  }
}
