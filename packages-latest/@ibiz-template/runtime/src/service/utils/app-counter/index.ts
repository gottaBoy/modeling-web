import { registerAppCounterProvider } from '../../../register';
import { AppCounter } from './app-counter';
import { AppDECounter } from './app-de-counter';
import { AppDECounterProvider } from './app-de-counter.provider';

/**
 * 预置默认的应用计数器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:50
 * @export
 */
export function presetAppCounterProvider(): void {
  // 应用实体计数器
  registerAppCounterProvider('DEDR', () => new AppDECounterProvider());
}

export { AppCounter, AppDECounter, AppDECounterProvider };
