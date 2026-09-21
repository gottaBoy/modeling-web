import {
  IButtonContainerState,
  ITreeGridExRowState,
  ITreeNodeData,
} from '../../../interface';
import { TreeGridExController } from './tree-grid-ex.controller';

/**
 * 树表格（增强）行数据状态类
 *
 * @author lxm
 * @date 2023-12-22 10:39:01
 * @export
 * @class TreeGridExRowState
 * @implements {ITreeGridExRowState}
 */
export class TreeGridExRowState implements ITreeGridExRowState {
  data: ITreeNodeData;

  cacheData?: ITreeNodeData;

  errors: { [p: string]: string | null } = {};

  columnActionsStates: { [p: string]: IButtonContainerState } = {};

  editColStates: {
    [p: string]: {
      disabled: boolean;
      readonly: boolean;
      editable: boolean;
      required: boolean;
    };
  } = {};

  modified: boolean = false;

  showRowEdit: boolean = false;

  processing: boolean = false;

  constructor(data: ITreeNodeData, treeGrid: TreeGridExController) {
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
        let $readonly: boolean;
        Object.defineProperty(
          this.editColStates[fieldColumn.name],
          'readonly',
          {
            enumerable: true,
            configurable: true,
            get() {
              // 自身设置了值则只看自身
              if ($readonly !== undefined) {
                return $readonly;
              }
              // 自身没有设置值，看父
              if (treeGrid.context) {
                return !!(
                  treeGrid.context.srfreadonly === true ||
                  treeGrid.context.srfreadonly === 'true'
                );
              }
              return false;
            },
            set(val) {
              $readonly = val;
              return true;
            },
          },
        );
      });
    }
  }
}
