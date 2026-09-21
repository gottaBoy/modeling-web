import { ICaptionBar } from '@ibiz/model-core';
import { IApiCaptionBarState } from '../../state';
import { IApiControlController } from './i-api-control.controller';

/**
 * 标题栏
 * @description 在 PC 端场景下，页面标题通常清晰显示于页面顶部的左侧区域；而在移动端场景下，页面标题则一般位于页面顶部的中间区域。
 * @primary
 * @export
 * @interface IApiCaptionBarController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiCaptionBarController<
  T extends ICaptionBar = ICaptionBar,
  S extends IApiCaptionBarState = IApiCaptionBarState,
> extends IApiControlController<T, S> {
  /**
   * @description 设置浏览器标签页标题
   * @memberof IApiCaptionBarController
   */
  setBrowserTabTitle(): void;
}
