/**
 * 合并树部件
 *
 * @author tony001
 * @date 2024-09-26 17:09:25
 * @export
 * @param {IDETree} dst
 * @param {IDETree} source
 */
export function mergeTreeView(dst, source) {
    if (!dst || !source)
        return;
    // 合并树节点
    if (source.detreeNodes && source.detreeNodes.length > 0) {
        if (!dst.detreeNodes) {
            dst.detreeNodes = [];
        }
        source.detreeNodes.forEach(sourceNode => {
            var _a;
            const isExist = dst.detreeNodes.find(dstNode => {
                return dstNode.id === sourceNode.id;
            });
            if (!isExist) {
                (_a = dst.detreeNodes) === null || _a === void 0 ? void 0 : _a.push(sourceNode);
            }
        });
    }
    // 合并树节点关系
    if (source.detreeNodeRSs && source.detreeNodeRSs.length > 0) {
        if (!dst.detreeNodeRSs) {
            dst.detreeNodeRSs = [];
        }
        source.detreeNodeRSs.forEach(sourceNodeRs => {
            var _a;
            const isExist = dst.detreeNodeRSs.find(dstNodeRs => {
                return (dstNodeRs.parentDETreeNodeId === sourceNodeRs.parentDETreeNodeId &&
                    dstNodeRs.childDETreeNodeId === sourceNodeRs.childDETreeNodeId);
            });
            if (!isExist) {
                (_a = dst.detreeNodeRSs) === null || _a === void 0 ? void 0 : _a.push(sourceNodeRs);
            }
        });
    }
}
