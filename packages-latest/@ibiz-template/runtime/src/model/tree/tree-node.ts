import { IDETree, IDETreeNode, IDETreeStaticNode } from '@ibiz/model-core';

/**
 * 获取树的根节点
 * @author lxm
 * @date 2023-05-26 08:50:20
 * @export
 * @param {IDETree} tree
 * @return {*}  {IDETreeStaticNode}
 */
export function getRootNode(tree: IDETree): IDETreeStaticNode {
  return tree.detreeNodes!.find(node => node.rootNode)!;
}

/**
 * 获取树节点模型
 * @author lxm
 * @date 2023-05-29 06:31:48
 * @export
 * @param {IDETree} tree 节点模型
 * @param {string} id 节点模型id
 * @return {*}  {IDETreeNode}
 */
export function getTreeNode(tree: IDETree, id: string): IDETreeNode {
  return tree.detreeNodes!.find(node => node.id === id)!;
}
