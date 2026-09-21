import { IPanelContainer, IPanelItem } from '@ibiz/model-core';

/**
 * 判断面板成员模型是否是数据容器
 * @author lxm
 * @date 2023-09-06 04:56:01
 * @export
 * @param {IPanelItem} panelItem
 * @return {*}  {boolean}
 */
export function isDataContainer(panelItem: IPanelItem): boolean {
  return (
    panelItem.itemType === 'CONTAINER' &&
    [
      'CONTAINER_MULTIDATA',
      'CONTAINER_SINGLEDATA',
      'CONTAINER_MULTIDATA_RAW',
    ].includes((panelItem as IPanelContainer).predefinedType!)
  );
}

/**
 * @description 判断是否为仅数据模式容器
 * @export
 * @param {IPanelItem} panelItem
 * @return {*}  {boolean}
 */
export function isSimpleDataContainer(panelItem: IPanelItem): boolean {
  return (
    panelItem.itemType === 'CONTAINER' &&
    ['CONTAINER_MULTIDATA_RAW'].includes(
      (panelItem as IPanelContainer).predefinedType!,
    )
  );
}
