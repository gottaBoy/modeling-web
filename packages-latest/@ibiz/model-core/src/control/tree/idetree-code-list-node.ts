import { IDETreeNode } from './idetree-node';

/**
 *
 * 继承父接口类型值[CODELIST]
 * @export
 * @interface IDETreeCodeListNode
 */
export interface IDETreeCodeListNode extends IDETreeNode {
  /**
   * 应用代码表对象
   *
   * @type {string}
   * 来源  getPSCodeList
   */
  codeListId?: string;

  /**
   * 附加节点标题
   * @type {boolean}
   * 来源  isAppendCaption
   */
  appendCaption?: boolean;
}
