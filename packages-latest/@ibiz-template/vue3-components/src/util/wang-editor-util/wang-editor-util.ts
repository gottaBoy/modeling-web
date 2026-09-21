/* eslint-disable no-cond-assign */
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
export function parseHtml(str: string): string {
  // 表情解析
  const regex =
    /<span\sdata-w-e-type="emoji"\sclass=['"]emoji['"]>(.+?)<\/span>/g;
  let match;
  let result = str;
  while ((match = regex.exec(str)) !== null) {
    const emoji = match[1];
    const tempVal = decodeURIComponent(atob(emoji));
    result = result.replace(
      match[0],
      `<span data-w-e-type="emoji" class='emoji'>${tempVal}</span>`,
    );
  }
  return result;
}
