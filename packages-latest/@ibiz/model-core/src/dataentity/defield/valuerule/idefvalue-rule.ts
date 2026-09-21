import { IDEFVRGroupCondition } from './idefvrgroup-condition';
import { ILanguageRes } from '../../../res/ilanguage-res';
import { IModelObject } from '../../../imodel-object';

/**
 *
 * 实体属性值规则模型对象接口
 * @export
 * @interface IDEFValueRule
 */
export interface IDEFValueRule extends IModelObject {
  /**
   * 代码名称
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 实体属性值规则条件
   *
   * @type {IDEFVRGroupCondition}
   * 来源  getPSDEFVRGroupCondition
   */
  groupCond?: IDEFVRGroupCondition;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 规则信息
   * @type {string}
   * 来源  getRuleInfo
   */
  ruleInfo?: string;

  /**
   * 规则信息语言资源标记
   * @type {string}
   * 来源  getRuleInfoLanResTag
   */
  ruleInfoLanResTag?: string;

  /**
   * 规则信息语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getRuleInfoPSLanguageRes
   */
  ruleInfoLanguageRes?: ILanguageRes;

  /**
   * 规则标记
   * @type {string}
   * 来源  getRuleTag
   */
  ruleTag?: string;

  /**
   * 规则标记2
   * @type {string}
   * 来源  getRuleTag2
   */
  ruleTag2?: string;

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 默认检查
   * @type {boolean}
   * 来源  isCheckDefault
   */
  checkDefault?: boolean;

  /**
   * 自定义脚本代码
   * @type {boolean}
   * @default false
   * 来源  isCustomCode
   */
  customCode?: boolean;

  /**
   * 默认规则
   * @type {boolean}
   * 来源  isDefaultMode
   */
  defaultMode?: boolean;

  /**
   * 支持后台执行
   * @type {boolean}
   * 来源  isEnableBackend
   */
  enableBackend?: boolean;

  /**
   * 支持前台执行
   * @type {boolean}
   * 来源  isEnableFront
   */
  enableFront?: boolean;
}
