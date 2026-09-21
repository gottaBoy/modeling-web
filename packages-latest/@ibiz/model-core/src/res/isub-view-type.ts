import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISubViewType
 */
export interface ISubViewType extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 视图命名模式
   * @description 值模式 [系统视图样式名称附加模式] {APPEND：名称附加、 REPLACE：名称替换 }
   * @type {( string | 'APPEND' | 'REPLACE')}
   * 来源  getNameMode
   */
  nameMode?: string | 'APPEND' | 'REPLACE';

  /**
   * 类型代码
   * @type {string}
   * 来源  getTypeCode
   */
  typeCode?: string;

  /**
   * 视图模型
   * @type {IModel}
   * 来源  getViewModel
   */
  viewModel?: IModel;

  /**
   * 标准视图类型
   * @type {string}
   * 来源  getViewType
   */
  viewType?: string;

  /**
   * 仅扩展界面样式
   * @type {boolean}
   * @default false
   * 来源  isExtendStyleOnly
   */
  extendStyleOnly?: boolean;

  /**
   * 全局默认替换
   * @type {boolean}
   * @default false
   * 来源  isReplaceDefault
   */
  replaceDefault?: boolean;
}
