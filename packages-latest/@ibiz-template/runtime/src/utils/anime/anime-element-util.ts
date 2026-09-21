//  基础样式
const baseStyle = {
  position: 'fixed',
  zIndex: '10000',
};

export function cloneElement(
  clone: string | HTMLElement,
  teleport: HTMLElement = document.body,
  isRemoveChild: boolean = true,
): HTMLElement {
  const element = getAnimationElement(clone);
  if (element == null) {
    throw new Error(ibiz.i18n.t('runtime.utils.anime.noClone'));
  }
  // 使用 DOM 的 cloneNode 方法深复制元素
  const clonedElement = element.cloneNode(true) as HTMLElement;
  if (isRemoveChild) {
    while (clonedElement.firstChild) {
      clonedElement.removeChild(clonedElement.firstChild);
    }
  }
  const styles = getElementAttribute(element);
  setElementStyle(clonedElement, styles);
  teleport.appendChild(clonedElement);
  // 返回克隆后的元素
  return clonedElement;
}

/**
 * 设置元素样式
 *
 * @author zk
 * @date 2024-01-25 11:01:37
 * @param {HTMLElement} element
 * @param {{
 *     width: number;
 *     height: number;
 *     padding: number;
 *     boundingLeft: number;
 *     boundingTop: number;
 *   }} {
 *     width,
 *     height,
 *     boundingLeft,
 *     boundingTop,
 *   }
 */
function setElementStyle(
  element: HTMLElement,
  {
    width,
    height,
    boundingLeft,
    boundingTop,
  }: {
    width: number;
    height: number;
    padding: number;
    boundingLeft: number;
    boundingTop: number;
  },
): void {
  element.style.left = `${boundingLeft}px`;
  element.style.top = `${boundingTop}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  Object.assign(element.style, baseStyle);
}

/**
 * 获取元素属性
 *
 * @author zk
 * @date 2024-01-25 11:01:06
 * @export
 * @param {HTMLElement} element
 * @return {*}  {{
 *   width: number;
 *   height: number;
 *   min: number;
 *   padding: number;
 *   boundingLeft: number;
 *   boundingTop: number;
 * }}
 */
export function getElementAttribute(element: HTMLElement): {
  width: number;
  height: number;
  padding: number;
  boundingLeft: number;
  boundingTop: number;
} {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const styles = window.getComputedStyle(element);
  const padding = parseFloat(styles.padding);
  const { left: boundingLeft, top: boundingTop } = (
    element as HTMLElement
  ).getBoundingClientRect();
  return {
    width,
    height,
    padding,
    boundingLeft,
    boundingTop,
  };
}

/**
 * 获取事件动画元素
 *
 * @author zk
 * @date 2024-01-23 11:01:16
 * @param {string} tag
 * @return {*}  {(HTMLElement | undefined)}
 * @memberof AnimeElementUtil
 */
export function getAnimationElement(
  element: string | HTMLElement,
): HTMLElement | undefined {
  if (typeof element === 'string') {
    return document.querySelector(element) as HTMLElement;
  }
  // 参数本身是HTMLElement类型
  return element;
}

/**
 * 销毁事件动画元素
 *
 * @author zk
 * @date 2024-01-23 10:01:39
 * @param {HTMLElement} ele
 * @memberof AnimeElementUtil
 */
export function destroyElement(ele: HTMLElement): void {
  if (ele) {
    ele.remove();
  }
}
