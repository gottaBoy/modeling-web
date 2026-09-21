import { IAppDataEntity } from '@ibiz/model-core';

// 匹配 ${} 中间的内容
const reg = /\$\{(.*?)\}/g;

/**
 * 获取匹配的资源路径
 * - 没匹配返回undefined
 * - 匹配了返回一个对象，里面包含
 * - path是/父名称复数/${父名称小写}/子名称复数/${子名称小写}格式的字符串
 * - keys是所有名称小写的字符串集合
 * @author lxm
 * @date 2023-07-12 07:02:52
 * @export
 * @param {IParams} context
 * @param {IAppDataEntity} entity
 * @return {*}  {({ path: string; keys: string[] } | undefined)}
 */
export function getMatchResPath(
  context: IParams,
  entity: IAppDataEntity,
): { path: string; keys: string[] } | undefined {
  const pathItems = entity.requestPaths || [];
  // 获取所有的路径需要匹配的参数
  const items: { path: string; keys: string[] }[] = pathItems.map(str => {
    const match = str.match(reg);
    const keys = match?.map(item => item.substring(2, item.length - 1)) || [];
    return {
      path: str,
      keys,
    };
  });
  // 过滤掉所有不能满足填充的路径, 并且按照填充参数个数排序，填充参数最多的优先依次递减排序
  const filterItems = items
    .filter(item => {
      // 匹配有几个需要填充的参数
      const { keys } = item;
      // 如果没有需要填充的参数，直接算
      if (keys.length === 0) {
        return true;
      }
      return keys.every((key, index) => {
        // 最后一个自身的主键直接通过
        if (index === keys.length - 1) {
          return true;
        }
        return context[key] != null;
      });
    })
    .sort((a, b) => b.keys.length - a.keys.length);
  // 如果有匹配的路径，直接取第一个。然后填充字符串返回
  if (filterItems.length > 0) {
    return filterItems[0];
  }
  return undefined;
}

/**
 * 计算资源路径url（不包含自身的资源路径）
 *
 * @author lxm
 * @date 2022-11-25 13:11:53
 * @export
 * @param {IContext} context 上下文对象
 * @param {ServicePathItem[][]} pathItems 计算出的资源关系路径
 * @return {*}  {string}
 */
export function calcResPath(context: IContext, entity: IAppDataEntity): string {
  const item = getMatchResPath(context, entity);
  if (item) {
    if (item.keys.length > 0) {
      let { path } = item;
      item.keys.forEach((key, index) => {
        if (index === item.keys.length - 1) {
          // 不需要主键的把主键那段替换为空字符串
          path = path.replace(new RegExp(`/[^/]+/\\$\\{${key}\\}`), '');
        } else {
          path = path.replace(`\${${key}}`, context[key]);
        }
      });
      return path;
    }
    return item.path;
  }
  return '';
}
