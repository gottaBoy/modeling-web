/**
 * 计算数据项
 * @param nodeModel
 * @param fieldCodeName
 * @returns
 */
export const calcDataItemValue = (fieldCodeName, nodeModel, data = {}) => {
    let result = '';
    if (!fieldCodeName || !nodeModel.detreeNodeDataItems) {
        return result;
    }
    const targetTreeNodeDataItem = nodeModel.detreeNodeDataItems.find((nodeDataItem) => {
        return nodeDataItem.detreeColumnId === fieldCodeName;
    });
    if (targetTreeNodeDataItem && targetTreeNodeDataItem.appDEFieldId) {
        result = data[targetTreeNodeDataItem.appDEFieldId.toLowerCase()];
    }
    return result;
};
