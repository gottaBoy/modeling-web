import { h } from 'vue';
import {
  INotificationUtil,
  IUploadManagerParams,
  NotificationParams,
} from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ElNotification, NotificationHandle } from 'element-plus';
import { parseHtml } from '../wang-editor-util/wang-editor-util';
import { IBizUploadManager } from './upload-manager/upload-manager';

/**
 * 在界面右上角显示可关闭的全局通知
 *
 * @author chitanda
 * @date 2022-08-17 16:08:26
 * @export
 * @class NotificationUtil
 * @implements {INotificationUtil}
 */
export class NotificationUtil implements INotificationUtil {
  /**
   * 通知调用栈
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 15:32:07
   */
  callStack: Array<() => void> = [];

  /**
   * 用于存储定时器返回的标识符
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 15:32:23
   */
  intervalId: NodeJS.Timeout | null = null;

  /**
   * 上传管理器
   *
   * @private
   * @type {(NotificationHandle | undefined)}
   * @memberof NotificationUtil
   */
  private uploadManagerHandle: NotificationHandle | undefined;

  /**
   * 执行下一步
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 15:32:45
   */
  private executeNext(): void {
    const errorHandler = this.callStack.shift(); // 取出数组中的第一个元素
    if (errorHandler) {
      errorHandler(); // 执行处理错误的函数
    } else {
      // 如果调用栈为空，清除定时器
      clearInterval(this.intervalId!);
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
  private handleNotice(params: NotificationParams, noticeType: string): void {
    const duration = params.duration ? params.duration * 1000 : 4500;
    const msgContent = params.desc ? parseHtml(params.desc) : params.desc;
    ElNotification({
      title: params.title,
      message: msgContent,
      dangerouslyUseHTMLString: !!params.isHtmlDesc,
      type: noticeType,
      position: params.position || 'top-right',
      duration,
      customClass: params.class,
      onClick: params.onClick,
    } as NotificationParams);
  }

  /**
   * 设置定时器
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-11-17 16:08:40
   */
  private setTimer() {
    // 如果之前没有设置过定时器，则设置定时器
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        // 每隔50毫秒执行一次
        this.executeNext();
      }, 50);
    }
  }

  default(params: NotificationParams): void {
    this.callStack.push(() => this.handleNotice(params, ''));
    this.setTimer();
  }

  info(params: NotificationParams): void {
    this.callStack.push(() => this.handleNotice(params, 'info'));
    this.setTimer();
  }

  success(params: NotificationParams): void {
    this.callStack.push(() => this.handleNotice(params, 'success'));
    this.setTimer();
  }

  warning(params: NotificationParams): void {
    this.callStack.push(() => this.handleNotice(params, 'warning'));
    this.setTimer();
  }

  error(params: NotificationParams): void {
    this.callStack.push(() => this.handleNotice(params, 'error'));
    this.setTimer();
  }

  uploadManager(params: IUploadManagerParams): Promise<IData[]> {
    this.uploadManagerHandle?.close();
    this.uploadManagerHandle = undefined;
    return new Promise(resolve => {
      const ns = useNamespace('upload-manager-notic');
      this.uploadManagerHandle = ElNotification({
        duration: 0,
        showClose: false,
        customClass: ns.b(),
        position: 'bottom-right',
        message: h(IBizUploadManager, {
          params,
          onUploadComplete: (data: IData[]) => {
            resolve(data);
          },
          onClose: () => {
            // 关闭时销毁
            this.uploadManagerHandle?.close();
            this.uploadManagerHandle = undefined;
          },
        }),
      });
    });
  }
}
