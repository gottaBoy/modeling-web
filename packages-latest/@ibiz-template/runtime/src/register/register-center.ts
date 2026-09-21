import { IProvider } from '../interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NewProvider = (...args: any[]) => IProvider;

/**
 * 注册中心
 *
 * @author lxm
 * @date 2022-09-19 19:09:10
 * @export
 * @class Register
 */
export class RegisterCenter {
  /**
   * 已注册的适配器Map
   * @author lxm
   * @date 2023-05-06 09:55:33
   * @protected
   * @type {Map<string, NewProvider>}
   */
  protected providers: Map<string, NewProvider> = new Map();

  /**
   * 注册适配器
   * @author lxm
   * @date 2023-05-06 09:55:55
   * @param {string} key 唯一标识
   * @param {NewProvider} newProvider 创建适配器实例的回调
   */
  register(key: string, newProvider: NewProvider): void {
    this.providers.set(key, newProvider);
  }

  /**
   * 注销适配器
   * @author lxm
   * @date 2023-05-06 09:56:19
   * @param {string} key
   */
  unRegister(key: string): void {
    this.providers.delete(key);
  }

  /**
   * 获取适配器的实例
   * @author lxm
   * @date 2023-05-06 09:56:34
   * @param {string} key 唯一标识
   * @param {...Parameters<NewProvider>} args 回调参数
   * @return {*}  {(IProvider | undefined)}
   */
  get(key: string, ...args: Parameters<NewProvider>): IProvider | undefined {
    const func = this.providers.get(key);
    if (func) {
      return func(...args);
    }
  }
}
