import { IDEForm } from './ideform';

/**
 *
 * 实体搜索表单模型对象接口
 * 继承父接口类型值[SEARCHFORM]
 * @export
 * @interface IDESearchForm
 */
export interface IDESearchForm extends IDEForm {
  /**
   * 搜索按钮位置
   * @description 值模式 [搜索表单按钮位置] {RIGHT：右边、 BOTTOM：下方 }
   * @type {( string | 'RIGHT' | 'BOTTOM')}
   * 来源  getSearchButtonPos
   */
  searchButtonPos?: string | 'RIGHT' | 'BOTTOM';

  /**
   * 搜索按钮样式
   * @description 值模式 [搜索表单按钮样式] {DEFAULT：默认、 NONE：不显示、 SEARCHONLY：只有搜索、 USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'DEFAULT' | 'NONE' | 'SEARCHONLY' | 'USER' | 'USER2')}
   * 来源  getSearchButtonStyle
   */
  searchButtonStyle?:
    | string
    | 'DEFAULT'
    | 'NONE'
    | 'SEARCHONLY'
    | 'USER'
    | 'USER2';

  /**
   * 支持高级搜索
   * @type {boolean}
   * 来源  isEnableAdvanceSearch
   */
  enableAdvanceSearch?: boolean;

  /**
   * 支持自动搜索
   * @type {boolean}
   * 来源  isEnableAutoSearch
   */
  enableAutoSearch?: boolean;

  /**
   * 支持条件保存
   * @type {boolean}
   * 来源  isEnableFilterSave
   */
  enableFilterSave?: boolean;
}
