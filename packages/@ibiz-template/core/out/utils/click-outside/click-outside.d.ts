import { OnClickOutsideHandler, OnClickOutsideOptions, OnClickOutsideResult } from '../../interface';
/**
 * 监听目标元素之外的点击事件回调
 *
 * @author lxm
 * @date 2022-10-28 18:10:25
 * @export
 * @param {HTMLElement} target 目标元素
 * @param {OnClickOutsideHandler} handler 触发的时间回调
 * @param {OnClickOutsideOptions} [options={}] 额外配置参数
 * @returns {*}  {OnClickOutsideResult}
 */
export declare function onClickOutside(target: HTMLElement, handler: OnClickOutsideHandler, options?: OnClickOutsideOptions): OnClickOutsideResult;
//# sourceMappingURL=click-outside.d.ts.map