/**
 * 解析html内容
 * @description 解析html内容, 用法传入字符串 返回值为string类型
 * ```
 * parseHtml(`<span data-w-e-type="emoji" class='emoji'>JUYwJTlGJTk4JTg0</span>` => `<span data-w-e-type="emoji" class='emoji'>😄</span>`
 * 正则中class=['"]emoji['"]适配单双引号的情况
 * ```
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export declare function parseHtml(str: string): string;
