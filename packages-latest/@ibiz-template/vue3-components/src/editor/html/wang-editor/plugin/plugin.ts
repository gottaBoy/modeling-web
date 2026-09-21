import { DomEditor, IDomEditor } from '@wangeditor/editor';

/**
 * 插件
 * @param editor
 * @returns
 */
export const Plugin = <T extends IDomEditor>(editor: T): T => {
  const { isInline, isVoid } = editor;

  /**
   * 根据节点类型定义是否为行内元素
   * @param elem
   * @returns
   */
  editor.isInline = elem => {
    const type = DomEditor.getNodeType(elem);
    if (type === 'emoji') {
      return true;
    }
    return isInline(elem);
  };

  /**
   * 根据节点类型定义是否为 void 节点
   * @param elem
   * @returns
   */
  editor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem);
    if (type === 'emoji') {
      return true;
    }
    return isVoid(elem);
  };

  return editor;
};
