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
export declare class AnimeUtil {
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
    movePoint(element: AnimeTarget, tElement: AnimeTarget, options?: IAnimationOptions): Promise<boolean>;
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
    moveToTarget(element: HTMLElement, toElement: HTMLElement, options?: IAnimationOptions): Promise<boolean>;
    /**
     * 目标调整大小
     *
     * @author zk
     * @date 2024-01-22 03:01:42
     * @param {HTMLElement} target
     * @param {anime.AnimeParams} [options={}]
     * @param {IData} [builtInParams={}]
     */
    resize(targets: AnimeTarget | AnimeTarget[], options?: IAnimationOptions): Promise<boolean>;
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
    moveAndResize(element: AnimeTarget, toElement: AnimeTarget, options?: IAnimationOptions): Promise<boolean>;
}
export {};
//# sourceMappingURL=anime-util.d.ts.map