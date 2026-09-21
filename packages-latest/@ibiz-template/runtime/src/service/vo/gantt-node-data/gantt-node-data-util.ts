import { IDETreeNode, IDETreeNodeDataItem } from '@ibiz/model-core';

/**
 * 计算数据项
 * @param nodeModel
 * @param fieldCodeName
 * @returns
 */
export const calcDataItemValue = (
  fieldCodeName: string | undefined,
  nodeModel: IDETreeNode,
  data: IData = {},
): string => {
  let result: string = '';
  if (!fieldCodeName || !nodeModel.detreeNodeDataItems) {
    return result;
  }
  const targetTreeNodeDataItem: IDETreeNodeDataItem | undefined =
    nodeModel.detreeNodeDataItems.find((nodeDataItem: IDETreeNodeDataItem) => {
      return nodeDataItem.detreeColumnId === fieldCodeName;
    });
  if (targetTreeNodeDataItem && targetTreeNodeDataItem.appDEFieldId) {
    result = data[targetTreeNodeDataItem.appDEFieldId!.toLowerCase()];
  }
  return result;
};
