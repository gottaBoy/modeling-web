import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取下拉列表props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getDropdownProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格下拉列表props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridDropdownProps<C>() {
  return { ...getDropdownProps<C>(), ...getGridEditorCommonProps() };
}
