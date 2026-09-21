import { TreeGridExColumnController } from '../tree-grid-ex-column/tree-grid-ex-column.controller';
import { TreeGridExNodeColumnController } from './tree-grid-ex-node-column.controller';
/**
 * 树表格（增强）属性列控制器
 * @author lxm
 * @date 2023-12-21 02:02:36
 * @export
 * @class TreeGridExFieldColumnController
 * @extends {TreeGridExColumnController<IDETreeDEFColumn>}
 */
export class TreeGridExFieldColumnController extends TreeGridExColumnController {
    constructor() {
        super(...arguments);
        /**
         * 该树表格列对应不同节点模型的节点列控制器
         * @author lxm
         * @date 2024-01-08 05:40:56
         * @type {Map<string, IDETreeNodeColumn>}
         */
        this.nodeColumnControllerMap = new Map();
    }
    /**
     * 树表格列标识（用于取数和各种比较判断）
     * @author lxm
     * @date 2024-01-09 11:33:37
     * @readonly
     * @type {string}
     */
    get name() {
        return this.model.id;
    }
    async init() {
        await this.onInit();
        await this.initNodeColumnController();
    }
    /**
     * 解析模型并初始化相关属性
     * @author lxm
     * @date 2024-01-08 05:59:12
     * @return {*}  {Promise<void>}
     */
    async initNodeColumnController() {
        var _a;
        (_a = this.treeGrid.model.detreeNodes) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            var _a;
            if (node.treeNodeType !== 'DE') {
                return;
            }
            const nodeColumn = (_a = node.detreeNodeColumns) === null || _a === void 0 ? void 0 : _a.find((column) => {
                return column.detreeColumnId === this.model.id;
            });
            // 没有指定树表格列的不创建
            if (nodeColumn) {
                this.nodeColumnControllerMap.set(node.id, new TreeGridExNodeColumnController(this, node));
            }
        });
        // 都走一遍初始化
        await Promise.all(Array.from(this.nodeColumnControllerMap.values()).map(controller => controller.init()));
    }
    /**
     * 初始化属性列界面行为组按钮状态
     * @author lxm
     * @date 2024-01-11 01:48:38
     * @param {ITreeGridExRowState} row
     */
    initActionStates(row) {
        const nodeColumn = this.nodeColumnControllerMap.get(row.data._nodeId);
        if (nodeColumn) {
            nodeColumn.initActionStates(row);
        }
    }
    gridStateNotify(row, state) {
        super.gridStateNotify(row, state);
        const nodeColumn = this.nodeColumnControllerMap.get(row.data._nodeId);
        if (nodeColumn) {
            nodeColumn.gridStateNotify(row, state);
        }
    }
}
