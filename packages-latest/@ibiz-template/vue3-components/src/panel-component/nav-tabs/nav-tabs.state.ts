import { PanelItemState } from '@ibiz-template/runtime';
import { ISysImage } from '@ibiz/model-core';

export interface TabMsg {
  /**
   * tab标识
   *
   * @type {string}
   * @memberof TabMsg
   */
  key: string;
  /**
   * 视图标记
   *
   * @type {string}
   * @memberof TabMsg
   */
  viewKey?: string;
  /**
   * 标题
   *
   * @type {string}
   * @memberof TabMsg
   */
  caption?: string;
  /**
   * 数据信息
   *
   * @type {string}
   * @memberof TabMsg
   */
  dataInfo?: string;
  /**
   * 图片
   *
   * @type {ISysImage}
   * @memberof TabMsg
   */
  sysImage?: ISysImage;
}

/**
 * 导航标签页占位状态
 *
 * @author lxm
 * @date 2023-02-07 06:04:27
 * @export
 * @class NavTabsState
 * @extends {PanelItemState}
 */
export class NavTabsState extends PanelItemState {
  /**
   * @description 当前路由key
   * @exposedoc
   */
  currentKey: string = '';

  /**
   * @description 分页标签项
   * @exposedoc
   */
  tabItems: TabMsg[] = [];

  /**
   * @description 当前激活tab
   * @exposedoc
   */
  activeTab: string = '';
}
