import { ComponentInternalInstance, Ref } from 'vue';

type AnyFunction = () => void;
/**
 * @description 调整颜色不透明度
 * @param {String} color   十六进制| Rgb | Rgb颜色或颜色关键字
 * @param {Number} Percent 不透明度
 * @return {String|Boolean} Rgba颜色（无效输入将返回false）
 */
declare const fade: (color: string, Percent: number) => string | false;
/**
 * @description 合并color
 * @param {string[]} defaultColors 默认颜色
 * @param {string[]} color 传递颜色
 * @return {string[]} 边框颜色
 */
declare const deepMerge: (defaultColors: string[], color: string[]) => string[];
/**
 * @description 挂载
 * @param {HTMLElement} dom dom节点
 */
declare const bindDomResizeCallback: (dom: HTMLElement, initWH: AnyFunction) => void;
/**
 * @description 卸载
 * @param {HTMLElement} dom dom节点
 */
declare const unbindDomResizeCallback: (dom: HTMLElement) => void;
/**
 * @description 获取主题色
 * @return {string} 颜色
 */
declare const getThemeVar: () => string | null;
/**
 * @description 获取线长度
 * @param {IData} points
 * @return {number} 线长度
 */
declare const getPolylineLength: (points: IData) => any;
export { fade, deepMerge, bindDomResizeCallback, unbindDomResizeCallback, getThemeVar, getPolylineLength, };
export declare function randomExtend(minNum: number, maxNum: number): number;
export declare function debounce(delay: number, callback: Function, that: ComponentInternalInstance, args: IParams | null): () => void;
export declare function observerDomResize(dom: HTMLElement, callback: MutationCallback): MutationObserver;
export declare function autoResize(dom: Ref<HTMLElement | null>, onResize?: () => void, afterAutoResizeMixinInit?: () => void): {
    width: Ref<number, number>;
    height: Ref<number, number>;
    initWH: (resize?: boolean) => Promise<unknown>;
};
export declare function $RandomSplit(total: number, nums: number): number[];
export declare function $NormalSort(arr: number[]): number[];
export declare function $Normal(mean: number, sigma: number): number;
export declare function $RandomColor(): string;
export declare function getRandomColorFromArray(colors: string[]): string;
