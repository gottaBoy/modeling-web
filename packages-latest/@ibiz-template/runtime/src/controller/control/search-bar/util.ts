import { ISearchBarFilter } from '@ibiz/model-core';
import { ValueOP } from '../../../constant';

export const ItemsValueOPs: string[] = [
  ValueOP.EXISTS,
  ValueOP.NOT_EXISTS,
] as const;

const SubFieldRegex = /^N_(.\w+)_(.\w+)$/; // N_USER_ID_EQ格式字符串中的USER_ID和EQ

/**
 * 是否是简单ITEMS模式
 * @author lxm
 * @date 2024-04-10 01:46:24
 * @export
 * @param {ISearchBarFilter} model
 * @return {*}  {boolean}
 */
export function isSimpleItems(model: ISearchBarFilter): boolean {
  return model.userParam?.ITEMTYPE === 'SIMPLE';
}

/**
 * 是否是隐藏的过滤项
 * @author lxm
 * @date 2024-04-10 01:47:43
 * @export
 * @param {ISearchBarFilter} model
 * @return {*}  {boolean}
 */
export function isHiddenFilter(model: ISearchBarFilter): boolean {
  return model.userParam?.ITEMTYPE === 'HIDDEN';
}

/**
 * 解析出子属性的字段名和操作符
 * @example
 * parseSubFieldInfo('N_ATTENTIONS_EXISTS__N_USER_ID_EQ') => { field: 'USER_ID', op: 'EQ' }
 * @author lxm
 * @date 2024-04-10 02:03:57
 * @export
 * @param {string} str
 * @return {*}  {{ field: string; op: string }}
 */
export function parseSubFieldInfo(str: string): { field: string; op: string } {
  const subStr = str.split('__')[1];
  const matches = subStr!.match(SubFieldRegex)!;
  return { field: matches[1], op: matches[2] };
}
