import { IControlMDObject } from '../icontrol-mdobject';
import { IDETreeNode } from './idetree-node';

/**
 *
 * 继承父接口类型值[DE]
 * @export
 * @interface IDETreeDataSetNode
 */
export interface IDETreeDataSetNode extends IDETreeNode, IControlMDObject {
  /**
   * 节点计数值应用实体属性
   *
   * @type {string}
   * 来源  getChildCntPSAppDEField
   */
  childCntAppDEFieldId?: string;

  /**
   * 节点样式表值应用实体属性
   *
   * @type {string}
   * 来源  getClsPSAppDEField
   */
  clsAppDEFieldId?: string;

  /**
   * 附加查询条件
   * @type {string}
   * 来源  getCustomCond
   */
  customCond?: string;

  /**
   * 数据值2应用实体属性
   *
   * @type {string}
   * 来源  getData2PSAppDEField
   */
  data2AppDEFieldId?: string;

  /**
   * 数据对象名称
   * @type {string}
   * 来源  getDataName
   */
  dataName?: string;

  /**
   * 数据值应用实体属性
   *
   * @type {string}
   * 来源  getDataPSAppDEField
   */
  dataAppDEFieldId?: string;

  /**
   * 数据源类型
   * @description 值模式 [动态树节点源] {DEACTION：实体行为、 DEDATASET：实体集合、 DELOGIC：实体逻辑、 PARENTDATAPARAM：绑定父数据变量、 APPGLOBALPARAM：绑定应用全局变量、 TOPVIEWSESSIONPARAM：绑定顶级视图会话共享变量、 VIEWSESSIONPARAM：绑定当前视图会话共享变量、 CUSTOM：自定义代码 }
   * @type {( string | 'DEACTION' | 'DEDATASET' | 'DELOGIC' | 'PARENTDATAPARAM' | 'APPGLOBALPARAM' | 'TOPVIEWSESSIONPARAM' | 'VIEWSESSIONPARAM' | 'CUSTOM')}
   * 来源  getDataSourceType
   */
  dataSourceType?:
    | string
    | 'DEACTION'
    | 'DEDATASET'
    | 'DELOGIC'
    | 'PARENTDATAPARAM'
    | 'APPGLOBALPARAM'
    | 'TOPVIEWSESSIONPARAM'
    | 'VIEWSESSIONPARAM'
    | 'CUSTOM';

  /**
   * 过滤应用实体结果集对象
   *
   * @type {string}
   * 来源  getFilterPSAppDEDataSet
   */
  filterAppDEDataSetId?: string;

  /**
   * 节点图标值应用实体属性
   *
   * @type {string}
   * 来源  getIconPSAppDEField
   */
  iconAppDEFieldId?: string;

  /**
   * 节点标识值应用实体属性
   *
   * @type {string}
   * 来源  getIdPSAppDEField
   */
  idAppDEFieldId?: string;

  /**
   * 叶节点标识值应用实体属性
   *
   * @type {string}
   * 来源  getLeafFlagPSAppDEField
   */
  leafFlagAppDEFieldId?: string;

  /**
   * 链接值应用实体属性
   *
   * @type {string}
   * 来源  getLinkPSAppDEField
   */
  linkAppDEFieldId?: string;

  /**
   * 最大加载节点数
   * @type {number}
   * 来源  getMaxSize
   */
  maxSize?: number;

  /**
   * 移动数据访问行为
   * @type {string}
   * 来源  getMoveDataAccessAction
   */
  moveDataAccessAction?: string;

  /**
   * 移动数据应用实体行为
   *
   * @type {string}
   * 来源  getMovePSAppDEAction
   */
  moveAppDEActionId?: string;

  /**
   * 移动要求操作标识
   *
   * @type {string}
   * 来源  getMovePSDEOPPriv
   */
  moveDEOPPrivId?: string;

  /**
   * 应用实体行为对象
   *
   * @type {string}
   * 来源  getPSAppDEAction
   */
  appDEActionId?: string;

  /**
   * 应用实体结果集对象
   *
   * @type {string}
   * 来源  getPSAppDEDataSet
   */
  appDEDataSetId?: string;

  /**
   * 应用实体逻辑对象
   *
   * @type {string}
   * 来源  getPSAppDELogic
   */
  appDELogicId?: string;

  /**
   * 分页大小
   * @type {number}
   * @default -1
   * 来源  getPagingSize
   */
  pagingSize?: number;

  /**
   * 删除数据访问行为
   * @type {string}
   * 来源  getRemoveDataAccessAction
   */
  removeDataAccessAction?: string;

  /**
   * 删除数据应用实体行为
   *
   * @type {string}
   * 来源  getRemovePSAppDEAction
   */
  removeAppDEActionId?: string;

  /**
   * 删除要求操作标识
   *
   * @type {string}
   * 来源  getRemovePSDEOPPriv
   */
  removeDEOPPrivId?: string;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 图形样式应用实体属性
   *
   * @type {string}
   * 来源  getShapeClsPSAppDEField
   */
  shapeClsAppDEFieldId?: string;

  /**
   * 节点排序方向
   * @description 值模式 [树节点字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getSortDir
   */
  sortDir?: string | 'ASC' | 'DESC';

  /**
   * 节点排序值应用实体属性
   *
   * @type {string}
   * 来源  getSortPSAppDEField
   */
  sortAppDEFieldId?: string;

  /**
   * 节点文本格式化
   * @type {string}
   * 来源  getTextFormat
   */
  textFormat?: string;

  /**
   * 节点文本值属性对象
   *
   * @type {string}
   * 来源  getTextPSAppDEField
   */
  textAppDEFieldId?: string;

  /**
   * 节点提示值应用实体属性
   *
   * @type {string}
   * 来源  getTipsPSAppDEField
   */
  tipsAppDEFieldId?: string;

  /**
   * 更新数据访问行为
   * @type {string}
   * 来源  getUpdateDataAccessAction
   */
  updateDataAccessAction?: string;

  /**
   * 更新数据应用实体行为
   *
   * @type {string}
   * 来源  getUpdatePSAppDEAction
   */
  updateAppDEActionId?: string;

  /**
   * 更新要求操作标识
   *
   * @type {string}
   * 来源  getUpdatePSDEOPPriv
   */
  updateDEOPPrivId?: string;

  /**
   * 附加节点标题
   * @type {boolean}
   * @default false
   * 来源  isAppendCaption
   */
  appendCaption?: boolean;

  /**
   * 数据排重模式
   * @type {boolean}
   * @default false
   * 来源  isDistinctMode
   */
  distinctMode?: boolean;

  /**
   * 支持分页
   * @type {boolean}
   * @default false
   * 来源  isEnablePaging
   */
  enablePaging?: boolean;
}
