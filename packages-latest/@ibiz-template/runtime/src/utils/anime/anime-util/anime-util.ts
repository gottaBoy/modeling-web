import {
  cloneElement,
  destroyElement,
  getAnimationElement,
  getElementAttribute,
} from '../anime-element-util';
import { moveToTarget, resize } from '../anime';
import { IAnimationOptions } from '../../../interface';

type AnimeTarget = string | HTMLElement;

/**
 * 动画工具类
 *
 * @author zk
 * @date 2024-01-24 09:01:05
 * @export
 * @class AnimeUtil
 */
export class AnimeUtil {
  /**
   * 元素移动到指定位置 移动点至指定元素
   *
   * @author zk
   * @date 2024-01-24 09:01:37
   * @param {Event} event
   * @param {HTMLElement} toElement
   * @param {anime.AnimeParams} [options={}]
   * @return {*}  {Promise<boolean>}
   * @memberof AnimeUtil
   */
  public async movePoint(
    element: AnimeTarget,
    tElement: AnimeTarget,
    options: IAnimationOptions = {},
  ): Promise<boolean> {
    // 获取移动终点元素
    const targetElement = getAnimationElement(tElement);
    if (!targetElement) {
      ibiz.log.debug(ibiz.i18n.t('runtime.utils.anime.noExistEndpointElement'));
      return false;
    }
    // 创建移动动画元素
    const moveElement = cloneElement(element, document.body);
    if (!moveElement) {
      ibiz.log.debug(
        ibiz.i18n.t('runtime.utils.anime.noExistAnimationElement'),
      );
      return false;
    }
    const { padding, width, height } = getElementAttribute(moveElement);
    // 移动点元素内置option
    const option = {
      borderRadius: ['0%', '50%'],
      maxWidth: [width, '6px'],
      maxHeight: [height, '6px'],
      minWidth: [width, '6px'],
      minHeight: [height, '6px'],
      padding: [padding, '6px'],
      duration: 700,
    };
    Object.assign(option, options);
    const result = await moveToTarget(moveElement, targetElement, option);
    destroyElement(moveElement);
    return result;
  }

  /**
   * 元素移动动画 元素a 移动到元素b
   *
   * @author zk
   * @date 2024-01-24 06:01:35\
   * @param {HTMLElement} element
   * @param {HTMLElement} toElement
   * @param {IAnimationOptions} [options={}]
   * @return {*}  {Promise<boolean>}
   * @memberof AnimeUtil
   */
  public moveToTarget(
    element: HTMLElement,
    toElement: HTMLElement,
    options: IAnimationOptions = {},
  ): Promise<boolean> {
    return moveToTarget(element, toElement, options);
  }

  /**
   * 目标调整大小
   *
   * @author zk
   * @date 2024-01-22 03:01:42
   * @param {HTMLElement} target
   * @param {anime.AnimeParams} [options={}]
   * @param {IData} [builtInParams={}]
   */
  public resize(
    targets: AnimeTarget | AnimeTarget[],
    options: IAnimationOptions = {},
  ): Promise<boolean> {
    return resize(targets, options);
  }

  /**
   * 目标移动和调整大小
   *
   * @author zk
   * @date 2024-01-24 06:01:15
   * @param {HTMLElement} element
   * @param {HTMLElement} toElement
   * @param {IAnimationOptions} [options={}]
   * @return {*}  {Promise<boolean>}
   * @memberof AnimeUtil
   */
  public async moveAndResize(
    element: AnimeTarget,
    toElement: AnimeTarget,
    options: IAnimationOptions = {},
  ): Promise<boolean> {
    const result = await this.movePoint(element, toElement, options);
    if (result) {
      await this.resize(toElement, { duration: 500 });
    }
    return result;
  }
}
