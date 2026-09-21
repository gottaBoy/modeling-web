import { IGridRowState, IButtonContainerState } from '../../../../interface';
import { ControlVO } from '../../../../service';
import { GridController } from './grid.controller';

/**
 * 表格行数据状态管理控制器
 *
 * @author lxm
 * @date 2022-09-05 19:09:02
 * @export
 * @class GridRowState
 */
export class GridRowState implements IGridRowState {
  data: ControlVO;

  oldData: ControlVO;

  cacheData?: ControlVO;

  /**
   * 错误信息集合，p是对应属性名称
   *
   * @author lxm
   * @date 2022-09-06 15:09:54
   * @type {({ [p: string]: string | null })}
   */
  errors: { [p: string]: string | null } = {};

  /**
   * 操作列状态(p是操作列的标识)
   *
   * @author lxm
   * @date 2022-09-07 22:09:38
   * @type {({ [p: string]: IButtonContainerState })}
   */
  uaColStates: { [p: string]: IButtonContainerState } = {};

  /**
   * 编辑列的状态
   *
   * @author lxm
   * @date 2022-09-20 15:09:58
   * @type {({ [p: string]: { disabled: boolean } })}
   */
  editColStates: {
    [p: string]: {
      disabled: boolean;
      readonly: boolean;
      editable: boolean;
      required: boolean;
    };
  } = {};

  /**
   * 界面行为组状态(p是界面行为的标识)
   *
   * @author zk
   * @date 2023-12-15 10:12:42
   * @type {{ [p: string]: IButtonContainerState }}
   * @memberof IGridRowState
   */
  uiActionGroupStates: { [p: string]: IButtonContainerState } = {};

  /**
   * 是否显示行编辑
   *
   * @author lxm
   * @date 2022-09-05 22:09:23
   * @type {boolean}
   */
  showRowEdit: boolean = false;

  /**
   * 是否被修改过
   *
   * @author lxm
   * @date 2022-11-02 22:11:33
   * @type {boolean}
   */
  modified: boolean = false;

  /**
   * 是否正在处理中(动态控制，值规则，表单项更新等逻辑中)
   * @author lxm
   * @date 2023-03-06 08:00:22
   * @type {boolean}
   * @memberof GridRowState
   */
  processing: boolean = false;

  getDiffData(): ControlVO {
    const diffData: IData = {};
    Object.keys(this.data).forEach(key => {
      // 值不一致 || 属性为主键
      if (
        this.data[key] !== this.oldData[key] ||
        key === this.data.srfkeyfield
      ) {
        diffData[key] = this.data[key];
      }
    });
    diffData.srfuf = this.data.srfuf;
    diffData.srfkey = this.data.srfkey;
    return new ControlVO(diffData, (this.oldData as ControlVO).$dataUIMap);
  }

  constructor(data: ControlVO, grid: GridController) {
    this.data = data;
    this.oldData = data.clone();

    // vue监控没有空值没法自动响应式更新
    Object.keys(this.data).forEach(key => {
      if (this.errors[key] === undefined) {
        this.errors[key] = null;
      }
    });

    // 初始化操作列状态
    Object.values(grid.uaColumns).forEach(column => {
      column.initActionStates(this);
    });

    // 初始化属性列状态
    Object.values(grid.fieldColumns).forEach(column => {
      column.initActionStates(this);
    });

    // 初始化编辑项状态（禁用、只读、可编辑器、必填）
    Object.values(grid.editColumns).forEach(editColumn => {
      this.editColStates[editColumn.fieldName] = {
        disabled: false,
        readonly: false,
        editable: grid.editShowMode === 'all',
        required: false,
      };
      let $readonly: boolean;
      Object.defineProperty(
        this.editColStates[editColumn.fieldName],
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
            if (grid.context) {
              return !!(
                grid.context.srfreadonly === true ||
                grid.context.srfreadonly === 'true'
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
