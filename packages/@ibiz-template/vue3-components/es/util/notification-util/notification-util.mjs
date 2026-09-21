import { h } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ElNotification } from 'element-plus';
import { parseHtml } from '../wang-editor-util/wang-editor-util.mjs';
import { IBizUploadManager } from './upload-manager/upload-manager.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NotificationUtil {
  constructor() {
    /**
     * 通知调用栈
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 15:32:07
     */
    __publicField(this, "callStack", []);
    /**
     * 用于存储定时器返回的标识符
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-17 15:32:23
     */
    __publicField(this, "intervalId", null);
    /**
     * 上传管理器
     *
     * @private
     * @type {(NotificationHandle | undefined)}
     * @memberof NotificationUtil
     */
    __publicField(this, "uploadManagerHandle");
  }
  /**
   * 执行下一步
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 15:32:45
   */
  executeNext() {
    const errorHandler = this.callStack.shift();
    if (errorHandler) {
      errorHandler();
    } else {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  /**
   * 处理各类型提示
   * @param {NotificationParams} params
   * @param {string} type
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 16:09:40
   */
  handleNotice(params, noticeType) {
    const duration = params.duration ? params.duration * 1e3 : 4500;
    const msgContent = params.desc ? parseHtml(params.desc) : params.desc;
    ElNotification({
      title: params.title,
      message: msgContent,
      dangerouslyUseHTMLString: !!params.isHtmlDesc,
      type: noticeType,
      position: params.position || "top-right",
      duration,
      customClass: params.class,
      onClick: params.onClick
    });
  }
  /**
   * 设置定时器
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 16:08:40
   */
  setTimer() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.executeNext();
      }, 50);
    }
  }
  default(params) {
    this.callStack.push(() => this.handleNotice(params, ""));
    this.setTimer();
  }
  info(params) {
    this.callStack.push(() => this.handleNotice(params, "info"));
    this.setTimer();
  }
  success(params) {
    this.callStack.push(() => this.handleNotice(params, "success"));
    this.setTimer();
  }
  warning(params) {
    this.callStack.push(() => this.handleNotice(params, "warning"));
    this.setTimer();
  }
  error(params) {
    this.callStack.push(() => this.handleNotice(params, "error"));
    this.setTimer();
  }
  uploadManager(params) {
    var _a;
    (_a = this.uploadManagerHandle) == null ? void 0 : _a.close();
    this.uploadManagerHandle = void 0;
    return new Promise((resolve) => {
      const ns = useNamespace("upload-manager-notic");
      this.uploadManagerHandle = ElNotification({
        duration: 0,
        showClose: false,
        customClass: ns.b(),
        position: "bottom-right",
        message: h(IBizUploadManager, {
          params,
          onUploadComplete: (data) => {
            resolve(data);
          },
          onClose: () => {
            var _a2;
            (_a2 = this.uploadManagerHandle) == null ? void 0 : _a2.close();
            this.uploadManagerHandle = void 0;
          }
        })
      });
    });
  }
}

export { NotificationUtil };
