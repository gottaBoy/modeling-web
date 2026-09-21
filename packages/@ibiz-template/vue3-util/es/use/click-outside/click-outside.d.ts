import { OnClickOutsideHandler, OnClickOutsideOptions, OnClickOutsideResult } from '@ibiz-template/core';
import { Ref } from 'vue';
/**
 * 使用点击组件外部监听事件
 *
 * @author lxm
 * @date 2022-10-31 14:10:12
 * @export
 * @param {Ref} elRef 组件的ref对象
 * @param {OnClickOutsideHandler} handler 处理回调
 * @param {OnClickOutsideOptions} [options={}] 额外配置参数
 * @returns {*}  {OnClickOutsideResult}
 */
export declare function useClickOutside(elRef: Ref, handler: OnClickOutsideHandler, options?: OnClickOutsideOptions): OnClickOutsideResult;
//# sourceMappingURL=click-outside.d.ts.map