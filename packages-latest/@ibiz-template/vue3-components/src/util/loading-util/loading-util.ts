import { ILoadingUtil } from '@ibiz-template/runtime';
import { ElLoading } from 'element-plus';

/**
 * 全局加载动画工具
 *
 * @author chitanda
 * @date 2022-08-17 17:08:44
 * @export
 * @class LoadingUtil
 * @implements {ILoadingUtil}
 */
export class LoadingUtil implements ILoadingUtil {
  /**
   * 当前只在触发的全局加载次数
   *
   * @author chitanda
   * @date 2022-08-17 17:08:44
   * @protected
   */
  protected count = 0;

  /**
   * 当前在触发的重定向加载动画次数
   *
   * @author chitanda
   * @date 2022-10-08 17:10:02
   * @protected
   */
  protected countRedirect = 0;

  /**
   * element plus loading 实例
   *
   * @author chitanda
   * @date 2022-12-29 15:12:26
   * @protected
   */
  protected loading!: { close: () => void };

  /**
   * 显示全局加载动画
   *
   * @author chitanda
   * @date 2022-12-29 15:12:26
   */
  show(): void {
    if (this.count === 0) {
      this.loading = ElLoading.service({ lock: true, fullscreen: true });
    }
    this.count += 1;
  }

  /**
   * 隐藏全局加载动画
   *
   * @author chitanda
   * @date 2022-08-17 17:08:11
   */
  hide(): void {
    if (this.count > 0) {
      this.count -= 1;
    }
    if (this.count === 0) {
      if (this.loading) {
        this.loading.close();
      }
    }
  }

  /**
   * 显示顶部加载动画
   *
   * @author chitanda
   * @date 2022-10-08 16:10:01
   */
  showRedirect(): void {
    // if (this.countRedirect === 0) {
    //   NProgress.start();
    // }
    // this.countRedirect += 1;
  }

  /**
   * 隐藏顶部加载动画
   *
   * @author chitanda
   * @date 2022-10-08 16:10:09
   */
  hideRedirect(): void {
    // if (this.countRedirect > 0) {
    //   this.countRedirect -= 1;
    // }
    // if (this.countRedirect === 0) {
    //   NProgress.done();
    // }
  }
}
