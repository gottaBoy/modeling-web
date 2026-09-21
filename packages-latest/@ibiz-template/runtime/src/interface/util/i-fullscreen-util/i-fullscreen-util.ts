import { IApiFullscreenUtil } from '../../api';
/**
 * @description 全屏工具类
 * @export
 * @interface IFullscreenUtil
 * @extends {IApiFullscreenUtil}
 */
export interface IFullscreenUtil extends IApiFullscreenUtil {
  /**
   * @description 全屏样式名称
   * @type {string}
   * @memberof IFullscreenUtil
   */
  FullscreenClass: string;

  /**
   * @description 是否是全屏状态
   * @type {boolean}
   * @memberof IFullscreenUtil
   */
  isFullScreen: boolean;
}
