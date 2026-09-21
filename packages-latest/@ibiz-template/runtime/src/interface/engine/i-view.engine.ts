/**
 * 通用视图引擎接口
 * @author lxm
 * @date 2023-05-04 02:02:50
 * @export
 * @interface IViewEngine
 */
export interface IViewEngine {
  /**
   * 执行视图预置界面行为能力
   * @author lxm
   * @date 2023-05-08 10:30:36
   * @param {string} key 预置界面行为tag标识
   * @param {...any[]} args 预置界面行为需要的参数
   * @return {*}  {(Promise<R | undefined>)} 返回undefined说明引擎没适配界面行为处理
   */
  call<A extends IData>(
    key: string,
    args?: A,
  ): Promise<IData | null | undefined>;

  /**
   * 视图created生命周期执行逻辑
   * @author lxm
   * @date 2023-05-15 06:39:37
   * @return {*}  {Promise<void>}
   */
  onCreated(): Promise<void>;

  /**
   * 视图mounted生命周期执行逻辑
   * @author lxm
   * @date 2023-05-15 06:39:37
   * @return {*}  {Promise<void>}
   */
  onMounted(): Promise<void>;

  /**
   * 视图destroyed生命周期执行逻辑
   * @author lxm
   * @date 2023-05-15 06:39:37
   * @return {*}  {Promise<void>}
   */
  onDestroyed(): Promise<void>;

  /**
   * 重新计算上下文，主要用于视图控制器再算上下文后，每个视图控制器可自身根据变动重新计算
   * @author zpc
   * @date 2024-03-12 13:48:37
   * @return {*}  {Promise<void>}
   */
  handleContextParams(): void;
}
