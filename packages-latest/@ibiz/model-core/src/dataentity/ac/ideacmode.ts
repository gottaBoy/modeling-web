import { IDEACModeDataItem } from './ideacmode-data-item';
import { IDEUIActionGroup } from '../uiaction/ideuiaction-group';
import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体自动填充模型对象接口
 * @export
 * @interface IDEACMode
 */
export interface IDEACMode extends IModelObject {
  /**
   * 自填类型
   * @description 值模式 [自动填充类型] {AUTOCOMPLETE：自动填充、 CHATCOMPLETION：聊天补全 }
   * @type {( string | 'AUTOCOMPLETE' | 'CHATCOMPLETION')}
   * @default AUTOCOMPLETE
   * 来源  getACType
   */
  actype?: string | 'AUTOCOMPLETE' | 'CHATCOMPLETION';

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 无值显示内容
   * @type {string}
   * 来源  getEmptyText
   */
  emptyText?: string;

  /**
   * 无值内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getEmptyTextPSLanguageRes
   */
  emptyTextLanguageRes?: ILanguageRes;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getItemPSSysPFPlugin
   */
  itemSysPFPluginId?: string;

  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 附加排序方向
   * @description 值模式 [字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getMinorSortDir
   */
  minorSortDir?: string | 'ASC' | 'DESC';

  /**
   * 数据项集合
   *
   * @type {IDEACModeDataItem[]}
   * 来源  getPSDEACModeDataItems
   */
  deacmodeDataItems?: IDEACModeDataItem[];

  /**
   * 界面行为组
   *
   * @type {IDEUIActionGroup}
   * 来源  getPSDEUIActionGroup
   */
  deuiactionGroup?: IDEUIActionGroup;

  /**
   * 分页模式
   * @description 值模式 [数据分页模式] {0：不分页、 1：分页栏、 2：滚动加载、 3：加载更多 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * @default 0
   * 来源  getPagingMode
   */
  pagingMode?: number | 0 | 1 | 2 | 3;

  /**
   * 分页大小
   * @type {number}
   * 来源  getPagingSize
   */
  pagingSize?: number;

  /**
   * 默认自填模式
   * @type {boolean}
   * 来源  isDefaultMode
   */
  defaultMode?: boolean;

  /**
   * 支持后台执行
   * @type {boolean}
   * @default false
   * 来源  isEnableBackend
   */
  enableBackend?: boolean;

  /**
   * 支持分页栏
   * @type {boolean}
   * 来源  isEnablePagingBar
   */
  enablePagingBar?: boolean;
}
