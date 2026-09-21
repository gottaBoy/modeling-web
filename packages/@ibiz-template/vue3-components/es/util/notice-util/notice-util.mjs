import { getAsyncActionProvider } from '@ibiz-template/runtime';
import { ElNotification } from 'element-plus';
import { reactive, h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import '../../common/index.mjs';
import '../../panel-component/user-message/addin-changed/index.mjs';
import { DoingNotice } from '../../common/doing-notice/doing-notice.mjs';
import { AddinChanged } from '../../panel-component/user-message/addin-changed/addin-changed.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NoticeUtil {
  constructor() {
    __publicField(this, "doingNotice");
  }
  async showAsyncAction(asyncAction) {
    const ns = useNamespace("async-action-notice");
    const porvider = await getAsyncActionProvider(asyncAction);
    if (porvider.render) {
      const ins = ElNotification({
        customClass: ns.b(),
        message: porvider.render({
          action: asyncAction,
          onClose: () => {
            ins.close();
          }
        }),
        position: "bottom-right",
        duration: 0
      });
    }
  }
  showDoingNotice(info) {
    if (!this.doingNotice) {
      const reactiveInfo = reactive(info);
      const ins = ElNotification({
        message: h(DoingNotice, {
          info: reactiveInfo
        }),
        onClose: () => {
          this.closeDoingNotice();
        },
        position: "bottom-right",
        duration: 0
      });
      this.doingNotice = { info: reactiveInfo, close: () => ins.close() };
    } else {
      Object.assign(this.doingNotice.info, info);
    }
  }
  closeDoingNotice() {
    if (this.doingNotice) {
      this.doingNotice.close();
      this.doingNotice = void 0;
    }
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  showAddInChangedNotice(msg) {
    const ns = useNamespace("addin-changed-notice");
    const ins = ElNotification({
      customClass: ns.b(),
      message: h(AddinChanged),
      onClose: () => {
        ins.close();
      },
      position: "bottom-right"
    });
  }
}

export { NoticeUtil };
