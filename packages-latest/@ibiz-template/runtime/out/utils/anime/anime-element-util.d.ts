export declare function cloneElement(clone: string | HTMLElement, teleport?: HTMLElement, isRemoveChild?: boolean): HTMLElement;
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
export declare function getElementAttribute(element: HTMLElement): {
    width: number;
    height: number;
    padding: number;
    boundingLeft: number;
    boundingTop: number;
};
/**
 * 获取事件动画元素
 *
 * @author zk
 * @date 2024-01-23 11:01:16
 * @param {string} tag
 * @return {*}  {(HTMLElement | undefined)}
 * @memberof AnimeElementUtil
 */
export declare function getAnimationElement(element: string | HTMLElement): HTMLElement | undefined;
/**
 * 销毁事件动画元素
 *
 * @author zk
 * @date 2024-01-23 10:01:39
 * @param {HTMLElement} ele
 * @memberof AnimeElementUtil
 */
export declare function destroyElement(ele: HTMLElement): void;
//# sourceMappingURL=anime-element-util.d.ts.map