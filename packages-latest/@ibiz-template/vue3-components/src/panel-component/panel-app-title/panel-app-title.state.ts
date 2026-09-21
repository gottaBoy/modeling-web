import { PanelItemState } from '@ibiz-template/runtime';

/**
 * @description 面板应用标题状态
 * @export
 * @class PanelAppTitleState
 * @extends {PanelItemState}
 */
export class PanelAppTitleState extends PanelItemState {
  /**
   * @description 应用标题
   * @exposedoc
   * @type {string}
   * @memberof PanelAppTitleState
   */
  caption: string = '';

  /**
   * @description 应用标题(收缩时)
   *
   * @type {string}
   * @memberof PanelAppTitleState
   */
  caption2: string = '';

  /**
   * @description 应用子标题
   * @exposedoc
   * @type {string}
   * @memberof PanelAppTitleState
   */
  subCaption?: string = '';

  /**
   * @description 应用子标题(收缩时)
   * @exposedoc
   * @type {string}
   * @memberof PanelAppTitleState
   */
  subCaption2?: string = '';

  /**
   * @description 应用 logo 图片地址
   * @exposedoc
   * @type {string}
   * @memberof PanelAppTitleState
   */
  icon: string = '';

  /**
   * @description 应用 logo 图片2地址(收缩时)
   * @exposedoc
   * @type {string}
   */
  icon2: string = '';

  /**
   * @description 是否为 svg 图标
   * @type {boolean}
   */
  isSvg: boolean = false;
}
