import {
  RuntimeModelError,
  ModelError,
  HttpError,
  NoticeError,
  RuntimeError,
} from '@ibiz-template/core';
import { IErrorHandler } from '../../interface';

/**
 * 默认处理器
 * @author lxm
 * @date 2023-09-26 04:52:18
 * @export
 * @class DefaultErrorHandler
 * @implements {IErrorHandler}
 */
export class DefaultErrorHandler implements IErrorHandler {
  /**
   * 错误去重时间间隔（300ms）
   */
  static DEDUP_INTERVAL = 300;

  /**
   * 错误缓存
   */
  static errorCache: Map<string, number> = new Map();

  /**
   * 判断错误是否重复
   */
  static isDuplicate(message: string): boolean {
    const { DEDUP_INTERVAL, errorCache } = DefaultErrorHandler;
    const now = Date.now();
    // 清理过期的缓存
    for (const [key, time] of errorCache) {
      if (now - time >= DEDUP_INTERVAL) {
        errorCache.delete(key);
      }
    }
    const lastTime = errorCache.get(message);
    if (lastTime !== undefined) {
      return true;
    }
    errorCache.set(message, now);
    return false;
  }

  /**
   * 处理错误
   */
  handle(error: unknown): boolean | undefined {
    const { isDuplicate } = DefaultErrorHandler;
    if (error instanceof RuntimeModelError || error instanceof ModelError) {
      if (!isDuplicate(error.message)) {
        ibiz.message.error(error.message, 10, true);
      }
    } else if (error instanceof HttpError) {
      if (error.status === 401) {
        const msg = ibiz.i18n.t('runtime.utils.errorHandler.noPermissionless');
        if (!isDuplicate(msg)) {
          ibiz.message.error(msg);
        }
      } else if (error.status === 404) {
        ibiz.mc.error.send(error);
      } else if (
        error.status === 500 &&
        error.response?.data?.type === 'DataEntityRuntimeException'
      ) {
        if (!isDuplicate(error.message)) {
          ibiz.message.error(error.message);
        }
      } else if (!isDuplicate(error.message)) {
        ibiz.notification.error({
          title: '',
          desc: error.message,
          duration: 10,
        });
      }
    } else if (error instanceof NoticeError) {
      if (!isDuplicate(error.message)) {
        ibiz.message.error(error.message, error.duration, error.duration === 0);
      }
    } else if (error instanceof RuntimeError) {
      if (!isDuplicate(error.message)) {
        ibiz.message.error(error.message, 10, true);
      }
    }
    ibiz.log.error(error);
    return true;
  }
}
