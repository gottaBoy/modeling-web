import { IPortalAsyncAction } from '@ibiz-template/core';
import { INoticeUtil, getAsyncActionProvider } from '@ibiz-template/runtime';
import { ElNotification } from 'element-plus';
import { h, reactive } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { DoingNotice } from '../../common';
import { AddinChanged } from '../../panel-component/user-message/addin-changed';

export class NoticeUtil implements INoticeUtil {
  doingNotice?: { info: IData; close: () => void };

  async showAsyncAction(asyncAction: IPortalAsyncAction): Promise<void> {
    const ns = useNamespace('async-action-notice');
    const porvider = await getAsyncActionProvider(asyncAction);
    if (porvider.render) {
      const ins = ElNotification({
        customClass: ns.b(),
        message: porvider.render({
          action: asyncAction,
          onClose: () => {
            ins.close();
          },
        }),
        position: 'bottom-right',
        // 进行中的消息不可自动关闭
        duration: [10, 20].includes(asyncAction.actionstate) ? 0 : undefined,
      });
    }
  }

  showDoingNotice(info: { num: number }): void {
    if (!this.doingNotice) {
      const reactiveInfo = reactive(info);
      const ins = ElNotification({
        message: h(DoingNotice, {
          info: reactiveInfo,
        }),
        onClose: () => {
          this.closeDoingNotice();
        },
        position: 'bottom-right',
        duration: 0,
      });
      this.doingNotice = { info: reactiveInfo, close: () => ins.close() };
    } else {
      Object.assign(this.doingNotice.info, info);
    }
  }

  closeDoingNotice(): void {
    if (this.doingNotice) {
      this.doingNotice.close();
      this.doingNotice = undefined;
    }
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  showAddInChangedNotice(msg: IData): void {
    const ns = useNamespace('addin-changed-notice');
    const ins = ElNotification({
      customClass: ns.b(),
      message: h(AddinChanged),
      onClose: () => {
        ins.close();
      },
      position: 'bottom-right',
    });
  }
}
