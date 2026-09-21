import anime from 'animejs';
type AnimeTarget = string | object | HTMLElement | SVGElement | NodeList | null;
/**
 * 元素移动动画
 *
 * @author zk
 * @date 2024-01-24 03:01:17
 * @export
 * @param {HTMLElement} moveElement
 * @param {HTMLElement} toElement
 * @param {anime.AnimeParams} [extraOpts={}]
 * @return {*}  {Promise<boolean>}
 */
export declare function moveToTarget(moveElement: HTMLElement, targetElement: HTMLElement, extraOpts?: anime.AnimeParams): Promise<boolean>;
/**
 * 目标调整大小
 *
 * @author zk
 * @date 2024-01-24 03:01:09
 * @export
 * @param {HTMLElement} targets
 * @param {anime.AnimeParams} [extraOpts={}]
 * @return {*}  {Promise<boolean>}
 */
export declare function resize(targets: AnimeTarget | readonly AnimeTarget[], extraOpts?: anime.AnimeParams): Promise<boolean>;
export {};
//# sourceMappingURL=anime.d.ts.map