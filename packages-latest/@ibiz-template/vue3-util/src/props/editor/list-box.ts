import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取列表框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getListBoxProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格列表框props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridListBoxProps<C>() {
  return { ...getListBoxProps<C>(), ...getGridEditorCommonProps() };
}
