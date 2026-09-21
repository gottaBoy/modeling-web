import { IApiData } from '@ibiz-template/core';
import { ISysImage } from '@ibiz/model-core';

/**
 * @description 代码项数据接口
 * @export
 * @interface CodeListItem
 */
export interface CodeListItem {
  /**
   * @description 值
   * @type {(string | number)}
   * @memberof CodeListItem
   */
  value: string | number;

  /**
   * @description 文本
   * @type {string}
   * @memberof CodeListItem
   */
  text: string;
  /**
   * @description 代码标识
   * @type {string}
   * @memberof CodeListItem
   */
  id: string;

  /**
   * @description 颜色
   * @type {string}
   * @memberof CodeListItem
   */
  color?: string;

  /**
   * @description 背景颜色
   * @type {string}
   * @memberof CodeListItem
   */
  bkcolor?: string;

  /**
   * @description 子代码项
   * @type {CodeListItem[]}
   * @memberof CodeListItem
   */
  children?: CodeListItem[];

  /**
   * @description 文本样式
   * @type {string}
   * @memberof CodeListItem
   */
  textCls?: string;

  /**
   * @description 样式表名称
   * @type {string}
   * @memberof CodeListItem
   */
  cls?: string;

  /**
   * @description 禁止选择
   * @type {boolean}
   * @memberof CodeListItem
   */
  disableSelect?: boolean;

  /**
   * @description 图标对象
   * @type {ISysImage}
   * @memberof CodeListItem
   */
  sysImage?: ISysImage;

  /**
   * @description 代码项数据
   * @type {IApiData}
   * @memberof CodeListItem
   */
  data?: IApiData;

  /**
   * @description 提示信息
   * @type {string}
   * @memberof CodeListItem
   */
  tooltip?: string;

  /**
   * @description 代码表标记
   * @type {string}
   * @memberof CodeListItem
   */
  userData?: string;

  /**
   * @description 阈值起始值
   * @type {number}
   * @memberof CodeListItem
   */
  beginValue?: number;

  /**
   * @description 阈值结束值
   * @type {number}
   * @memberof CodeListItem
   */
  endValue?: number;

  /**
   * @description 包含阈值起始值
   * @type {boolean}
   * @memberof CodeListItem
   */
  includeBeginValue?: boolean;

  /**
   * @description 包含阈值结束值
   * @type {boolean}
   * @memberof CodeListItem
   */
  includeEndValue?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any;
}
