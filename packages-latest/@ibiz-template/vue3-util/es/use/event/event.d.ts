import { Ref } from 'vue';
/**
 * 监听JS原生事件，返回cleanup回调，调用后删除该监听
 *
 * @author lxm
 * @date 2022-10-28 18:10:36
 * @export
 * @param {Ref} elRef 监听组件的ref
 * @param {string} eventName 监听事件名称
 * @param {(..._args: any[]) => any} listener 监听回调
 * @param {AddEventListenerOptions} options 额外参数
 * @returns {*}  {() => void}
 */
export declare function useEventListener(elRef: Ref, eventName: string, listener: (..._args: any[]) => any, options?: AddEventListenerOptions): () => void;
//# sourceMappingURL=event.d.ts.map