import { ILanguageRes } from '../res/ilanguage-res';
import { IModelObject } from '../imodel-object';

/**
 *
 * 系统预置值规则模型对象接口
 * @export
 * @interface ISysValueRule
 */
export interface ISysValueRule extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 自定义处理对象
   * @type {string}
   * 来源  getCustomObject
   */
  customObject?: string;

  /**
   * 自定义参数
   * @type {string}
   * 来源  getCustomParams
   */
  customParams?: string;

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 正则式代码
   * @type {string}
   * 来源  getRegExCode
   */
  regExCode?: string;

  /**
   * 正则式代码2
   * @type {string}
   * 来源  getRegExCode2
   */
  regExCode2?: string;

  /**
   * 正则式代码3
   * @type {string}
   * 来源  getRegExCode3
   */
  regExCode3?: string;

  /**
   * 正则式代码4
   * @type {string}
   * 来源  getRegExCode4
   */
  regExCode4?: string;

  /**
   * 值规则信息
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
   * 值规则类型
   * @description 值模式 [平台值规则类型] {SCRIPT：脚本、 REG：正则式（废弃）、 CUSTOM：自定义、 REGEX：正则式 }
   * @type {( string | 'SCRIPT' | 'REG' | 'CUSTOM' | 'REGEX')}
   * 来源  getRuleType
   */
  ruleType?: string | 'SCRIPT' | 'REG' | 'CUSTOM' | 'REGEX';

  /**
   * 脚本代码
   * @type {string}
   * 来源  getScriptCode
   */
  scriptCode?: string;

  /**
   * 唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;

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
