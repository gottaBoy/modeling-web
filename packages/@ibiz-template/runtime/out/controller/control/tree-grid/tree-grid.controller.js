import { RuntimeModelError } from '@ibiz-template/core';
import { GridController } from '../grid';
export class TreeGridController extends GridController {
    constructor() {
        super(...arguments);
        /**
         * 树表格值属性名称
         *
         */
        this.treeGridValueField = '';
        /**
         * 树表格父属性名称
         *
         */
        this.treeGridParentField = '';
    }
    initState() {
        super.initState();
        this.state.showTreeGrid = true;
        this.state.treeGirdData = [];
    }
    /**
     * 初始化方法
     *
     * @author lxm
     * @date 2022-08-18 22:08:17
     * @protected
     * @returns {*}  {Promise<void>}
     */
    async onCreated() {
        await super.onCreated();
        this.initTreeGridField();
    }
    /**
     * 初始化树表格字段
     * @return {*}
     * @author: zhujiamin
     */
    initTreeGridField() {
        var _a, _b;
        const treeGridParent = (_a = this.model.degridColumns) === null || _a === void 0 ? void 0 : _a.find((item) => {
            return item.treeColumnMode === 4 || item.treeColumnMode === 12;
        });
        const treeGridValue = (_b = this.model.degridColumns) === null || _b === void 0 ? void 0 : _b.find((item) => {
            return item.treeColumnMode === 2 || item.treeColumnMode === 3;
        });
        if (!treeGridParent) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.treeGrid.columnsSchema'));
        }
        if (!treeGridValue) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.treeGrid.columnMode'));
        }
        this.treeGridValueField = treeGridValue.appDEFieldId.toLowerCase();
        this.treeGridParentField = treeGridParent.appDEFieldId.toLowerCase();
    }
    async afterLoad(args, items) {
        await super.afterLoad(args, items);
        this.calcTreeGridData(this.state.items);
        return items;
    }
    /**
     * @description 获取树表格数据项
     * @param {IData} data
     * @return {*}  {IData}
     * @memberof TreeGridController
     */
    getTreeGridDataItem(data) {
        const tempData = data.clone();
        // 判断是否有子 （显示下拉图标）
        tempData.hasChildren = this.state.items.some(item => data[this.treeGridValueField] === item[this.treeGridParentField]);
        tempData.children = [];
        return tempData;
    }
    /**
     * @description 计算树表格数据
     * @param {IData[]} items
     * @memberof TreeGridController
     */
    calcTreeGridData(items) {
        const treeGirdItems = items.map(data => this.getTreeGridDataItem(data));
        const rootNodes = [];
        const ids = [];
        treeGirdItems.forEach(item => {
            const id = item[this.treeGridValueField];
            if (id) {
                ids.push(id);
            }
        });
        treeGirdItems.forEach(item => {
            if (!ids.includes(item[this.treeGridParentField])) {
                rootNodes.push(item);
            }
        });
        this.state.treeGirdData = rootNodes;
    }
    /**
     * 切换树表格显示
     * @return {*}
     * @author: zhujiamin
     */
    switchTreeGridShow() {
        this.state.showTreeGrid = !this.state.showTreeGrid;
    }
    /**
     * 切换行展开
     * @author: zzq
     * @date 2024-08-23 17:12:58
     * @return {*}  {void}
     */
    changeCollapse(params = {}) {
        const { tag, expand } = params;
        // 存在分组id则展开/收缩分组
        if (tag) {
            const row = this.state.items.find(x => x.srfkey === tag);
            if (row) {
                this._evt.emit('onToggleRowExpansion', { row, expand });
            }
        }
        else {
            // 不存在分组id时全展开/全收缩
            const groups = this.state.treeGirdData.filter(item => item.hasChildren);
            groups.forEach(item => {
                this._evt.emit('onToggleRowExpansion', { row: item, expand });
            });
        }
    }
}
