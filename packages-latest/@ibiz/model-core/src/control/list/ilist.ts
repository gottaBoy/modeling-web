import { IControlContainer } from '../icontrol-container';
import { IControlNavigatable } from '../icontrol-navigatable';
import { IMDAjaxControl } from '../imdajax-control';
import { ILayoutPanel } from '../panel/ilayout-panel';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 列表部件模型对象基础接口
 * @export
 * @interface IList
 */
export interface IList
  extends IMDAjaxControl,
    IControlContainer,
    IControlNavigatable {
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
   * 项布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getItemPSLayoutPanel
   */
  itemLayoutPanel?: ILayoutPanel;
}
