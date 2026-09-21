/**
 * helper 基类
 *
 * @author chitanda
 * @date 2021-12-29 14:12:34
 * @export
 * @class HelperBase
 */
export abstract class HelperBase {
  /**
   * Creates an instance of HelperBase.
   *
   * @author chitanda
   * @date 2021-12-29 14:12:47
   * @param {string} tag 助手标识
   */
  constructor(Handlebars: IData, tag: string) {
    Handlebars.registerHelper(tag, this.onExecute);
  }

  /**
   * 助手执行
   *
   * @author chitanda
   * @date 2022-08-05 18:08:03
   * @abstract
   * @param {...unknown[]} args
   * @return {*}  {(string | boolean)}
   */
  abstract onExecute(...args: unknown[]): string | boolean;
}
