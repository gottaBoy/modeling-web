import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取选项框列表props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getCheckboxListProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格选项框列表props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridCheckboxListProps<C>() {
  return { ...getCheckboxListProps<C>(), ...getGridEditorCommonProps() };
}
