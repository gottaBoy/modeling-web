import { CTX, IMobViewController } from '@ibiz-template/runtime';
import { inject } from 'vue';

/**
 * 获取视图上下文环境对象
 *
 * @author chitanda
 * @date 2023-06-16 15:06:16
 * @export
 * @return {*}  {CTX}
 */
export function useCtx(): CTX {
  return inject('ctx') as CTX;
}

/**
 * 获取移动端视图上下文环境对象
 *
 * @author chitanda
 * @date 2023-06-16 16:06:51
 * @export
 * @return {*}  {CTX<IMobViewController>}
 */
export function useMobCtx(): CTX<IMobViewController> {
  return inject('ctx') as CTX;
}
