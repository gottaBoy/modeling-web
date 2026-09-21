import { ILanguageRes } from '../../../res/ilanguage-res';
import { IModelObject } from '../../../imodel-object';

/**
 *
 * 子接口类型识别属性[condType]
 * @export
 * @interface IDEFVRCondition
 */
export interface IDEFVRCondition extends IModelObject {
  /**
   * 条件标记
   * @type {string}
   * 来源  getCondTag
   */
  condTag?: string;

  /**
   * 条件标记2
   * @type {string}
   * 来源  getCondTag2
   */
  condTag2?: string;

  /**
   * 条件项类型
   * @description 值模式 [实体属性值规则类型] {GROUP：条件组、 NULLRULE：空值判断、 VALUERANGE：数据集范围、 VALUERANGE2：数值范围、 REGEX：正则式、 STRINGLENGTH：字符长度、 SIMPLE：常规条件、 VALUERANGE3：值清单、 QUERYCOUNT：查询计数、 VALUERECURSION：值递归检查、 SYSVALUERULE：系统值规则 }
   * @type {( string | 'GROUP' | 'NULLRULE' | 'VALUERANGE' | 'VALUERANGE2' | 'REGEX' | 'STRINGLENGTH' | 'SIMPLE' | 'VALUERANGE3' | 'QUERYCOUNT' | 'VALUERECURSION' | 'SYSVALUERULE')}
   * 来源  getCondType
   */
  condType?:
    | string
    | 'GROUP'
    | 'NULLRULE'
    | 'VALUERANGE'
    | 'VALUERANGE2'
    | 'REGEX'
    | 'STRINGLENGTH'
    | 'SIMPLE'
    | 'VALUERANGE3'
    | 'QUERYCOUNT'
    | 'VALUERECURSION'
    | 'SYSVALUERULE';

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
   * 关键条件
   * @type {boolean}
   * @default false
   * 来源  isKeyCond
   */
  keyCond?: boolean;

  /**
   * 逻辑取反
   * @type {boolean}
   * @default false
   * 来源  isNotMode
   */
  notMode?: boolean;

  /**
   * 检查失败忽略
   * @type {boolean}
   * 来源  isTryMode
   */
  tryMode?: boolean;
}
