/**
 * 脚本函数构造选项
 * @author lxm
 * @date 2023-07-25 10:47:08
 * @export
 * @interface IScriptFunctionOpts
 */
export interface IScriptFunctionOpts {
  /**
   * 是否是单行脚本，并把表达式结果return
   * @author lxm
   * @date 2023-07-25 10:46:18
   * @type {boolean}
   */
  singleRowReturn?: boolean;

  /**
   * 预置参数
   * @author lxm
   * @date 2023-07-25 11:37:40
   * @type {IParams}
   */
  presetParams?: IParams;

  /**
   * 是否是异步函数脚本
   * @author lxm
   * @date 2023-08-21 03:15:43
   * @type {boolean}
   */
  isAsync?: boolean;
}
