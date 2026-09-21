import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取选项框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getCheckboxProps<C>() {
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
export function getGridCheckboxProps<C>() {
  return { ...getCheckboxProps<C>(), ...getGridEditorCommonProps() };
}
