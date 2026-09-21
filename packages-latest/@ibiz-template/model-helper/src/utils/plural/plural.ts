import pluralize from 'pluralize';

// 补充特殊转换规则
pluralize.addPluralRule(/(matr|vert|ind)ix|ex$/, '$1ices');

/**
 * 英文转复数写法
 *
 * @author chitanda
 * @date 2022-08-25 18:08:41
 * @export
 * @param {string} key
 * @return {*}  {string}
 */
export function plural(key: string): string {
  return pluralize(key);
}

/**
 * 英文转复数写法并转全小写
 *
 * @author chitanda
 * @date 2022-08-25 18:08:23
 * @export
 * @param {string} key
 * @return {*}  {string}
 */
export function pluralLower(key: string): string {
  return plural(key).toLowerCase();
}
