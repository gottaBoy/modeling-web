import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用智能立方体维度体系层级模型对象接口
 * @export
 * @interface IAppBICubeLevel
 */
export interface IAppBICubeLevel extends IModelObject {
  /**
   * 聚合标题
   * @type {string}
   * 来源  getAggCaption
   */
  aggCaption?: string;

  /**
   * 层级标记
   * @type {string}
   * 来源  getLevelTag
   */
  levelTag?: string;

  /**
   * 层级标记2
   * @type {string}
   * 来源  getLevelTag2
   */
  levelTag2?: string;

  /**
   * 层级类型
   * @description 值模式 [分析维度体系层级类型] {COMMON：常规、 TIME_YEARS：时间（年）、 TIME_HALFYEARS：时间（半年）、 TIME_QUARTERS：时间（季度）、 TIME_MONTHS：时间（月份）、 TIME_WEEKS：时间（周）、 TIME_DAYS：时间（天）、 TIME_HOURS：时间（小时）、 TIME_MINUTES：时间（分钟） }
   * @type {( string | 'COMMON' | 'TIME_YEARS' | 'TIME_HALFYEARS' | 'TIME_QUARTERS' | 'TIME_MONTHS' | 'TIME_WEEKS' | 'TIME_DAYS' | 'TIME_HOURS' | 'TIME_MINUTES')}
   * @default COMMON
   * 来源  getLevelType
   */
  levelType?:
    | string
    | 'COMMON'
    | 'TIME_YEARS'
    | 'TIME_HALFYEARS'
    | 'TIME_QUARTERS'
    | 'TIME_MONTHS'
    | 'TIME_WEEKS'
    | 'TIME_DAYS'
    | 'TIME_HOURS'
    | 'TIME_MINUTES';

  /**
   * 相关应用属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 文本项标识
   * @type {string}
   * 来源  getTextItemName
   */
  textItemName?: string;

  /**
   * 唯一标记成员
   * @type {boolean}
   * @default false
   * 来源  isUniqueMembers
   */
  uniqueMembers?: boolean;
}
