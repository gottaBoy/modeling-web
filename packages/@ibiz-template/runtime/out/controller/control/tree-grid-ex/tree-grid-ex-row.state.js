/**
 * 树表格（增强）行数据状态类
 *
 * @author lxm
 * @date 2023-12-22 10:39:01
 * @export
 * @class TreeGridExRowState
 * @implements {ITreeGridExRowState}
 */
export class TreeGridExRowState {
    constructor(data, treeGrid) {
        this.errors = {};
        this.columnActionsStates = {};
        this.editColStates = {};
        this.modified = false;
        this.showRowEdit = false;
        this.processing = false;
        this.data = data;
        // 实体类型节点才需要初始化这些
        if (data._nodeType === 'DE') {
            // 初始化操作列状态
            Object.values(treeGrid.uaColumns).forEach(column => {
                column.initActionStates(this);
            });
            // 初始化属性列的界面行为组状态
            Object.values(treeGrid.fieldColumns).forEach(column => {
                column.initActionStates(this);
            });
            // 初始化编辑项状态
            Object.values(treeGrid.fieldColumns).forEach(fieldColumn => {
                this.editColStates[fieldColumn.name] = {
                    disabled: false,
                    readonly: false,
                    editable: treeGrid.editShowMode === 'all',
                    required: false,
                };
                let $readonly;
                Object.defineProperty(this.editColStates[fieldColumn.name], 'readonly', {
                    enumerable: true,
                    configurable: true,
                    get() {
                        // 自身设置了值则只看自身
                        if ($readonly !== undefined) {
                            return $readonly;
                        }
                        // 自身没有设置值，看父
                        if (treeGrid.context) {
                            return !!(treeGrid.context.srfreadonly === true ||
                                treeGrid.context.srfreadonly === 'true');
                        }
                        return false;
                    },
                    set(val) {
                        $readonly = val;
                        return true;
                    },
                });
            });
        }
    }
}
