import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体数据导入数据项模型对象接口
 * @export
 * @interface IDEDataImportItem
 */
export interface IDEDataImportItem extends IModelObject {
  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

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
   * 代码表对象
   *
   * @type {string}
   * 来源  getPSCodeList
   */
  codeListId?: string;

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
   * 隐藏数据项
   * @type {boolean}
   * @default false
   * 来源  isHiddenDataItem
   */
  hiddenDataItem?: boolean;

  /**
   * 数据识别项
   * @type {boolean}
   * @default false
   * 来源  isUniqueItem
   */
  uniqueItem?: boolean;
}
