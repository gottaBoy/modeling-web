import {
  IPopoverOptions,
  IDrawerOptions,
  IModalOptions,
  IFloatWindowOptions,
} from '../../common';
import { IOverlayContainer } from '../i-overlay-container/i-overlay-container';
import { IOverlayPopoverContainer } from '../i-overlay-popover-container/i-overlay-popover-container';

/**
 * 全局呈现容器控制器
 *
 * @author chitanda
 * @date 2022-11-08 14:11:27
 * @export
 * @interface IOverlayController
 */
export interface IOverlayController {
  /**
   * 飘窗
   *
   * @author chitanda
   * @date 2022-11-09 12:11:22
   * @template T
   * @param {HTMLElement} element
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IPopoverOptions} [opts]
   * @return {*}  {Promise<T>}
   */
  popover<T = void>(
    element: HTMLElement,
    component: unknown,
    props?: IParams,
    opts?: IPopoverOptions,
  ): Promise<T>;

  /**
   * 创建飘窗全局容器
   *
   * @author chitanda
   * @date 2022-11-09 15:11:13
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IPopoverOptions} [opts]
   * @return {*}  {IOverlayPopoverContainer}
   */
  createPopover(
    component: unknown,
    props?: IParams,
    opts?: IPopoverOptions,
  ): IOverlayPopoverContainer;

  /**
   * 抽屉
   *
   * @author chitanda
   * @date 2022-11-08 15:11:45
   * @template T
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IDrawerOptions} [opts]
   * @return {*}  {Promise<T>}
   */
  drawer<T = void>(
    component: unknown,
    props?: IParams,
    opts?: IDrawerOptions,
  ): Promise<T>;

  /**
   * 创建全局抽屉容器
   *
   * @author chitanda
   * @date 2022-11-09 15:11:49
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IDrawerOptions} [opts]
   * @return {*}  {IOverlayContainer}
   */
  createDrawer(
    component: unknown,
    props?: IParams,
    opts?: IDrawerOptions,
  ): IOverlayContainer;

  /**
   * 模态
   *
   * @author chitanda
   * @date 2022-11-08 15:11:40
   * @template T
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IModalOptions} [opts]
   * @return {*}  {Promise<T>}
   */
  modal<T = void>(
    component: unknown,
    props?: IParams,
    opts?: IModalOptions,
  ): Promise<T>;

  /**
   * 创建全局模态容器
   *
   * @author chitanda
   * @date 2022-11-09 15:11:58
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IModalOptions} [opts]
   * @return {*}  {IOverlayContainer}
   */
  createModal(
    component: unknown,
    props?: IParams,
    opts?: IModalOptions,
  ): IOverlayContainer;

  /**
   * 模态
   *
   * @author chitanda
   * @date 2022-11-08 15:11:40
   * @template T
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IFloatWindowOptions} [opts]
   * @return {*}  {Promise<T>}
   */
  floatWindow<T = void>(
    component: unknown,
    props?: IParams,
    opts?: IFloatWindowOptions,
  ): Promise<T>;

  /**
   * 创建全局模态容器
   *
   * @author chitanda
   * @date 2022-11-09 15:11:58
   * @param {unknown} component 组件名称，组件对象，或者绘制函数
   * @param {IParams} [props] 组件props
   * @param {IFloatWindowOptions} [opts]
   * @return {*}  {IOverlayContainer}
   */
  createFloatWindow(
    component: unknown,
    props?: IParams,
    opts?: IFloatWindowOptions,
  ): IOverlayContainer;
}
