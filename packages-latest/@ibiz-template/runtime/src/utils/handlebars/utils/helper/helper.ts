/**
 * 助手工具类
 *
 * @author chitanda
 * @date 2021-12-29 17:12:32
 * @export
 * @class HelperUtil
 */
export class HelperUtil {
  /**
   * 当前所有助手 tag 名称
   *
   * @author chitanda
   * @date 2021-12-30 10:12:39
   * @protected
   * @type {string[]}
   */
  protected static helperNames: string[] = [
    'lookup',
    'log',
    'and',
    'abs',
    'camelCase',
    'concat',
    'eq',
    'gt',
    'get',
    'lowerCase',
    'lt',
    'lte',
    'neq',
    'not',
    'or',
    'pascalCase',
    'pluralize',
    'snakeCase',
    'spinalCase',
    'upperCase',
  ];

  /**
   * 判断字符串是否为助手
   *
   * @author chitanda
   * @date 2021-12-30 10:12:26
   * @static
   * @param {string} name
   * @return {*}  {boolean}
   */
  static isHelperName(name: string): boolean {
    return this.helperNames.includes(name);
  }

  /**
   * 判断类助手统一结果调用处理
   *
   * @author chitanda
   * @date 2021-12-29 17:12:23
   * @static
   * @param {unknown} context 执行上下文
   * @param {boolean} bol 判断结果
   * @param {Handlebars.HelperOptions} options
   * @return {*}  {(string | boolean)}
   */
  static handleJudgmentExecute(
    context: unknown,
    bol: boolean,
    options: Handlebars.HelperOptions,
  ): string | boolean {
    if (options.fn) {
      return bol ? options.fn(context) : options.inverse(context);
    }
    // eslint-disable-next-line no-return-assign
    return bol ? (options.hash.yes = true) : (options.hash.no = false);
  }
}
