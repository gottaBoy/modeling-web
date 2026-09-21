import { IDETree, IDETreeNodeRS } from '@ibiz/model-core';
import { getRootNode } from './tree-node';

/**
 * 判断节点关系是否显示
 * @author lxm
 * @date 2023-05-26 09:21:57
 * @param {Number} searchMode [树节点关系搜索模式] {1：有搜索时启用、 2：无搜索时启用、 3：全部启用 }
 * @param {boolean} hasQuery 是否有搜索条件
 */
function isNodeRsShow(searchMode: number, hasQuery: boolean): boolean {
  return searchMode === 3 || (hasQuery ? searchMode === 1 : searchMode === 2);
}

/**
 * 获取子节点关系
 * @author lxm
 * @date 2023-05-26 09:24:09
 * @export
 * @param {IDETree} tree
 * @param {{ parentId?: string; hasQuery: boolean }} args
 */
export function getChildNodeRSs(
  tree: IDETree,
  args: { parentId?: string; hasQuery: boolean },
): IDETreeNodeRS[] {
  const parentId = args.parentId || getRootNode(tree).id!;
  return tree.detreeNodeRSs!.filter(nodeRs => {
    return (
      nodeRs.parentDETreeNodeId === parentId &&
      isNodeRsShow(nodeRs.searchMode!, args.hasQuery)
    );
  });
}
