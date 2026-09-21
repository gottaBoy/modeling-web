import { IDETreeNode } from './idetree-node';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 继承父接口类型值[STATIC]
 * @export
 * @interface IDETreeStaticNode
 */
export interface IDETreeStaticNode extends IDETreeNode {
  /**
   * 静态节点值
   * @type {string}
   * 来源  getNodeValue
   */
  nodeValue?: string;

  /**
   * 节点文本
   * @type {string}
   * 来源  getText
   */
  text?: string;

  /**
   * 提示信息
   * @type {string}
   * 来源  getTooltip
   */
  tooltip?: string;

  /**
   * 提示语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTooltipPSLanguageRes
   */
  tooltipLanguageRes?: ILanguageRes;
}
