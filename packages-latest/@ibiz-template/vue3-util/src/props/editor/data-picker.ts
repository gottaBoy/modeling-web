import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取数据选择props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getDataPickerProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Array, Object, Number],
  };
}

/**
 * @description 获取表格数据选择props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridDataPickerProps<C>() {
  return { ...getDataPickerProps<C>(), ...getGridEditorCommonProps() };
}
