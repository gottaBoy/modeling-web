import { IModalData } from '@ibiz-template/runtime';
import { Router } from 'vue-router';
import { RouterCallbackItem } from './router-callback-item';

/**
 * 路由打开视图回调，连通上级视图的关闭
 *
 * @author chitanda
 * @date 2023-07-13 20:07:20
 * @export
 * @class RouterCallback
 */
export class RouterCallback {
  /**
   * 回调实例
   *
   * @author chitanda
   * @date 2023-07-13 20:07:12
   * @protected
   * @type {Map<string, RouterCallbackItem>}
   */
  protected map: Map<string, RouterCallbackItem> = new Map();

  /**
   * 打开视图
   *
   * @author chitanda
   * @date 2023-07-13 20:07:13
   * @param {Router} router
   * @param {string} path
   * @return {*}  {Promise<IModalData>}
   */
  async open(
    router: Router,
    path: string,
    modalOptions: IData = {},
  ): Promise<IModalData> {
    const from = router.currentRoute.value.fullPath;
    if (modalOptions.replace) {
      router.replace({ path });
    } else {
      router.push({ path });
    }
    const to = path;
    if (this.map.has(to)) {
      const item = this.map.get(to)!;
      return item.onWillDismiss();
    }
    const item = new RouterCallbackItem(from, to);
    this.map.set(to, item);
    this.scheduledDestruction(item);
    return item.onWillDismiss();
  }

  /**
   * 关闭视图回调
   *
   * @author chitanda
   * @date 2023-07-13 20:07:38
   * @param {string} toFullPath
   * @param {IModalData} modal
   */
  close(toFullPath: string, modal: IModalData): void {
    const item = this.map.get(toFullPath);
    if (item) {
      window.clearTimeout(item.timeout);
      item.timeout = undefined;
      item.close(modal);
      this.map.delete(toFullPath);
    }
  }

  /**
   * 激活回调
   *
   * @author chitanda
   * @date 2023-07-13 21:07:03
   * @param {string} toFullPath
   */
  active(toFullPath: string): void {
    const item = this.map.get(toFullPath);
    if (item) {
      window.clearTimeout(item.timeout);
      item.timeout = undefined;
      item.active();
    }
  }

  /**
   * 十分钟内未激活的视图回调会被清除
   *
   * @author chitanda
   * @date 2023-07-13 21:07:57
   * @protected
   * @param {RouterCallbackItem} item
   */
  protected scheduledDestruction(item: RouterCallbackItem): void {
    item.timeout = window.setTimeout(
      () => {
        item.timeout = undefined;
        item.destroy();
        this.map.delete(item.to);
      },
      10 * 60 * 1000,
    );
  }
}

// 路由打开视图回调，连通上级视图的关闭工具类
export const routerCallback = new RouterCallback();
