import { IScriptFunctionOpts } from '../../interface';
import { ScriptFunction } from './script-function';

export class ScriptFactory {
  /**
   * 创建脚本方法
   * @author lxm
   * @date 2023-07-25 11:47:48
   * @param {string[]} argKeys 参数列表
   * @param {string} scriptCode 脚本代码
   * @param {IScriptFunctionOpts} options 选项
   * @return {*}  {ScriptFunction}
   */
  static createScriptFn(
    argKeys: string[],
    scriptCode: string,
    options?: IScriptFunctionOpts,
  ): ScriptFunction {
    return new ScriptFunction(argKeys, scriptCode, options);
  }

  /**
   * 直接创建并执行脚本
   * @author lxm
   * @date 2023-07-25 02:21:28
   * @static
   * @param {IParams} args 脚本参数
   * @param {string} scriptCode 脚本代码
   * @param {IScriptFunctionOpts} options 选项
   * @return {*}
   */
  static execScriptFn(
    args: IParams,
    scriptCode: string,
    options?: IScriptFunctionOpts,
  ): unknown {
    return this.createScriptFn(Object.keys(args), scriptCode, options).exec(
      args,
    );
  }

  /**
   * 直接创建并同步执行脚本
   *
   * @author tony001
   * @date 2024-06-25 14:06:25
   * @static
   * @param {IParams} args
   * @param {string} scriptCode
   * @param {IScriptFunctionOpts} [options={}]
   * @return {*}  {Promise<unknown>}
   */
  static async asyncExecScriptFn(
    args: IParams,
    scriptCode: string,
    options: IScriptFunctionOpts = {},
  ): Promise<unknown> {
    const result = await this.createScriptFn(Object.keys(args), scriptCode, {
      ...options,
      isAsync: true,
    }).exec(args);
    return result;
  }

  /**
   * 执行单行脚本
   * @author lxm
   * @date 2023-10-20 03:20:56
   * @static
   * @param {string} scriptCode 脚本字符串
   * @param {IParams} [args={}] 作用域变量参数对象
   * @return {*}  {unknown}
   */
  static execSingleLine(scriptCode: string, args: IParams = {}): unknown {
    return this.execScriptFn(args, scriptCode, {
      singleRowReturn: true,
      isAsync: false,
    });
  }
}
