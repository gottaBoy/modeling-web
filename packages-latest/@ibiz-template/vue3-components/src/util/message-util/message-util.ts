import { IMessageUtil, IMessageParams } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { ElMessage, MessageOptions } from 'element-plus';
import { isNil, mergeRight } from 'ramda';

/**
 * 消息通知
 *
 * @author chitanda
 * @date 2022-08-17 16:08:24
 * @export
 * @class MessageUtil
 * @implements {IMessageUtil}
 */
export class MessageUtil implements IMessageUtil {
  protected ns = useNamespace('message');

  info(
    msg: string,
    duration?: number | undefined,
    closable?: boolean | undefined,
  ): void {
    ElMessage.info({
      message: msg,
      duration: duration ? duration * 1000 : duration,
      showClose: closable,
    });
  }

  success(
    msg: string,
    duration?: number | undefined,
    closable?: boolean | undefined,
  ): void {
    ElMessage.success({
      message: msg,
      duration: duration ? duration * 1000 : duration,
      showClose: closable,
    });
  }

  warning(
    msg: string,
    duration?: number | undefined,
    closable?: boolean | undefined,
  ): void {
    ElMessage.warning({
      message: msg,
      duration: duration ? duration * 1000 : duration,
      showClose: closable,
    });
  }

  error(
    msg: string,
    duration?: number | undefined,
    closable?: boolean | undefined,
  ): void {
    ElMessage.error({
      message: msg,
      duration: duration ? duration * 1000 : duration,
      showClose: closable,
    });
  }

  /**
   * 格式化参数
   * @author lxm
   * @date 2024-03-21 02:22:27
   * @protected
   * @param {IMessageParams} params
   * @return {*}  {MessageOptions}
   */
  protected formatParams(params: IMessageParams): MessageOptions {
    const paramsWithDefault = mergeRight(
      {
        type: 'info',
      },
      params,
    );

    const messageOpts: MessageOptions = {};
    Object.keys(paramsWithDefault).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = paramsWithDefault[key as keyof IMessageParams] as any;
      switch (key) {
        case 'duration':
          if (!isNil(value)) {
            messageOpts.duration = value * 1000;
          }
          break;
        case 'styleType':
          if (!isNil(value)) {
            messageOpts.customClass = this.ns.m(value);
          }
          break;

        default:
          (messageOpts as IData)[key] = value;
          break;
      }
    });
    return messageOpts;
  }

  notice(params: IMessageParams): void {
    ElMessage(this.formatParams(params));
  }
}
