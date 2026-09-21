import { registerDEMethodProvider } from '../../../../../register/helper/de-method-register';
import { DeActionDeMethodProvider } from './de-action-de-method.provider';
import { FetchDeMethodProvider } from './fetch-de-method.provider';

/**
 * 预定义的实体行为适配器
 * @author lxm
 * @date 2023-11-28 03:37:44
 * @export
 */
export function presetDEMethodProvider(): void {
  // *实体行为
  const deActionDeMethodProvider = new DeActionDeMethodProvider();
  registerDEMethodProvider('DEACTION', () => deActionDeMethodProvider);
  // *数据集合
  const fetchDeMethodProvider = new FetchDeMethodProvider();
  registerDEMethodProvider('FETCH', () => fetchDeMethodProvider);
  registerDEMethodProvider('FETCHTEMP', () => fetchDeMethodProvider);
}
