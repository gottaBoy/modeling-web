import {
  IPanel,
  IPanelContainer,
  IPanelField,
  IPanelItem,
} from '@ibiz/model-core';
import { isDataContainer } from './data-container';

const ChildKeys = ['panelItems', 'panelTabPages', 'rootPanelItems'] as const;

function _getAllPanelField(model: IData): IPanelField[] {
  let childItems: IPanelItem[] = [];
  for (const key of ChildKeys) {
    if (model[key] && model[key].length && model[key].length > 0) {
      childItems = model[key];
      break;
    }
  }
  const fields: IPanelField[] = [];

  if (childItems.length) {
    // 过滤出当前层级的子里面的所有面板属性
    fields.push(...childItems.filter(item => item.itemType === 'FIELD'));

    // 递归遍历拿子里面的成员
    childItems.forEach(item => {
      // 如果是数据容器则不往下找
      if (!isDataContainer(item)) {
        fields.push(..._getAllPanelField(item));
      }
    });
  }

  return fields;
}

/**
 * 获取所有子面板属性模型
 * @author lxm
 * @date 2023-11-01 04:45:44
 * @export
 * @param {(IPanel | IPanelContainer)} model
 * @return {*}  {IPanelField[]}
 */
export function getAllPanelField(
  model: IPanel | IPanelContainer,
): IPanelField[] {
  return _getAllPanelField(model);
}
