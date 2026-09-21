/**
 * 注册器接口
 *
 * @author lxm
 * @date 2022-09-19 19:09:14
 * @export
 * @interface IRegister
 */
export interface IRegister<T> {
  /**
   * 适配器集合
   *
   * @author lxm
   * @date 2022-10-17 16:10:54
   * @type {Map<string, T>}
   */
  providers: Map<string, T>;

  /**
   * 注册适配器
   *
   * @author lxm
   * @date 2022-09-19 19:09:48
   * @param {string} key
   * @param {T} provider
   */
  register(key: string, provider: T): void;

  /**
   * 注销适配器
   *
   * @author lxm
   * @date 2022-09-19 19:09:59
   * @param {string} key
   */
  unRegister(key: string): void;

  /**
   * 获取适配器
   *
   * @author lxm
   * @date 2022-09-19 19:09:13
   * @param {string} key
   * @returns {*}  {T}
   */
  getByKey(key: string): T | undefined;
}
