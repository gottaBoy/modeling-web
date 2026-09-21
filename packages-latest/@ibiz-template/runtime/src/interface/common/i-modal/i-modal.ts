import { AsyncSeriesHook } from 'qx-util';
import { ViewMode } from '../../../constant';
import { IModalData } from '../i-modal-data/i-modal-data';

type ModalHooks = {
  preDismiss: AsyncSeriesHook<[], { allowNext?: boolean }>;
  shouldDismiss: AsyncSeriesHook<
    [],
    {
      allowClose?: boolean;
    }
  >;
  beforeDismiss: AsyncSeriesHook<[], IModalData>;
};

/**
 * 模态操作对象，在模态等形式打开视图时，操作类需给视图注入此对象实现类
 *
 * @author chitanda
 * @date 2022-08-17 18:08:20
 * @export
 * @interface IModal
 */
export interface IModal {
  /**
   * 打开方式，影响逻辑和界面实现
   *
   * @author lxm
   * @date 2022-09-01 10:09:15
   * @type {string}
   */
  mode: ViewMode;

  /**
   * 是否忽略关闭检查，用于强制关闭视图
   *
   * @author chitanda
   * @date 2023-08-30 16:08:45
   * @type {boolean}
   */
  ignoreDismissCheck: boolean;

  /**
   * 路由绘制的视图才有，用于表示所在路由层级
   *
   * @type {number}
   * @memberof IModal
   */
  routeDepth?: number;

  /**
   * 视图使用模式（影响视图的呈现样式）
   * 1：默认模式（路由下），2: 模式弹出，4：嵌入
   * @author lxm
   * @date 2023-05-12 06:20:27
   * @type {number}
   */
  viewUsage?: number;

  /**
   * 钩子
   * @author lxm
   * @date 2023-05-31 11:36:53
   * @type {ModalHooks}
   */
  hooks: ModalHooks;

  /**
   * 统一关闭入口
   *
   * @author chitanda
   * @date 2022-08-17 18:08:58
   * @param {(IData | IData[])} data
   */
  dismiss: (data?: IModalData) => Promise<boolean>;
}
