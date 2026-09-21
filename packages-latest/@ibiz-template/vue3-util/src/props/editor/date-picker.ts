import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取日期选择器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getDatePickerProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * 值
     * @description 编辑器的值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格日期选择器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridDatePickerProps<C>() {
  return { ...getDatePickerProps<C>(), ...getGridEditorCommonProps() };
}
