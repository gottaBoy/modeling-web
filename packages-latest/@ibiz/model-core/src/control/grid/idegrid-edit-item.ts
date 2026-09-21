import { IEditorContainer } from '../ieditor-container';

/**
 *
 * 实体表格编辑项模型基础对象接口
 * @export
 * @interface IDEGridEditItem
 */
export interface IDEGridEditItem extends IEditorContainer {
  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 建立默认值
   * @type {string}
   * 来源  getCreateDV
   */
  createDV?: string;

  /**
   * 建立默认值类型
   * @description 值模式 [界面项默认值类型] {SESSION：用户全局对象、 APPLICATION：系统全局对象、 UNIQUEID：唯一编码、 CONTEXT：网页请求、 PARAM：数据对象属性、 OPERATOR：当前操作用户(编号)、 OPERATORNAME：当前操作用户(名称)、 CURTIME：当前时间、 APPDATA：当前应用数据 }
   * @type {( string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA')}
   * 来源  getCreateDVT
   */
  createDVT?:
    | string
    | 'SESSION'
    | 'APPLICATION'
    | 'UNIQUEID'
    | 'CONTEXT'
    | 'PARAM'
    | 'OPERATOR'
    | 'OPERATORNAME'
    | 'CURTIME'
    | 'APPDATA';

  /**
   * 启用条件
   * @description 值模式 [编辑项启用条件] {0：无、 1：建立、 2：更新、 3：全部 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * 来源  getEnableCond
   */
  enableCond?: number | 0 | 1 | 2 | 3;

  /**
   * 忽略输入模式
   * @description 值模式 [编辑项启用条件] {0：无、 1：建立、 2：更新、 3：全部 }
   * @type {( number | 0 | 1 | 2 | 3)}
   * 来源  getIgnoreInput
   */
  ignoreInput?: number | 0 | 1 | 2 | 3;

  /**
   * 输出代码表配置模式
   * @description 值模式 [代码表输出模式] {0：无、 1：只输出选择项、 2：输出子项 }
   * @type {( number | 0 | 1 | 2)}
   * @default 0
   * 来源  getOutputCodeListConfigMode
   */
  outputCodeListConfigMode?: number | 0 | 1 | 2;

  /**
   * 列应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 表格编辑项更新对象
   *
   * @type {string}
   * 来源  getPSDEGridEditItemUpdate
   */
  degridEditItemUpdateId?: string;

  /**
   * 重置项集合
   *
   * 来源 getResetItemNames
   */
  resetItemNames?: string[];

  /**
   * 单位名称
   * @type {string}
   * 来源  getUnitName
   */
  unitName?: string;

  /**
   * 单位宽度
   * @type {number}
   * @default 0
   * 来源  getUnitNameWidth
   */
  unitNameWidth?: number;

  /**
   * 更新默认值
   * @type {string}
   * 来源  getUpdateDV
   */
  updateDV?: string;

  /**
   * 更新默认值类型
   * @description 值模式 [界面项默认值类型] {SESSION：用户全局对象、 APPLICATION：系统全局对象、 UNIQUEID：唯一编码、 CONTEXT：网页请求、 PARAM：数据对象属性、 OPERATOR：当前操作用户(编号)、 OPERATORNAME：当前操作用户(名称)、 CURTIME：当前时间、 APPDATA：当前应用数据 }
   * @type {( string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA')}
   * 来源  getUpdateDVT
   */
  updateDVT?:
    | string
    | 'SESSION'
    | 'APPLICATION'
    | 'UNIQUEID'
    | 'CONTEXT'
    | 'PARAM'
    | 'OPERATOR'
    | 'OPERATORNAME'
    | 'CURTIME'
    | 'APPDATA';

  /**
   * 允许空值输入
   * @type {boolean}
   * 来源  isAllowEmpty
   */
  allowEmpty?: boolean;

  /**
   * 转化为代码项文本
   * @type {boolean}
   * @default false
   * 来源  isConvertToCodeItemText
   */
  convertToCodeItemText?: boolean;

  /**
   * 支持单位
   * @type {boolean}
   * @default false
   * 来源  isEnableUnitName
   */
  enableUnitName?: boolean;

  /**
   * 需要代码表配置
   * @type {boolean}
   * @default false
   * 来源  isNeedCodeListConfig
   */
  needCodeListConfig?: boolean;
}
