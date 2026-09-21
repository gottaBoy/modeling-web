import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体数据导出数据项模型对象接口
 * @export
 * @interface IDEDataExportItem
 */
export interface IDEDataExportItem extends IModelObject {
  /**
   * 水平对齐
   * @description 值模式 [表格列水平对齐] {LEFT：左对齐、 CENTER：居中、 RIGHT：右对齐 }
   * @type {( string | 'LEFT' | 'CENTER' | 'RIGHT')}
   * 来源  getAlign
   */
  align?: string | 'LEFT' | 'CENTER' | 'RIGHT';

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
   * 默认值
   * @type {IModel}
   * 来源  getDefaultValue
   */
  defaultValue?: IModel;

  /**
   * 格式化
   * @type {string}
   * 来源  getFormat
   */
  format?: string;

  /**
   * 应用实体属性
   *
   * @type {string}
   * 来源  getPSAppDEField
   */
  appDEFieldId?: string;

  /**
   * 代码表
   *
   * @type {string}
   * 来源  getPSCodeList
   */
  codeListId?: string;

  /**
   * 权限标识
   * @type {string}
   * 来源  getPrivilegeId
   */
  privilegeId?: string;

  /**
   * 隐藏项
   * @type {boolean}
   * @default false
   * 来源  isHidden
   */
  hidden?: boolean;
}
