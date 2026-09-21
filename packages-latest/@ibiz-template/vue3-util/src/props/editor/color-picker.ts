import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取颜色选择器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getColorPickerProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
  };
}

/**
 * @description 获取表格颜色选择器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridColorPickerProps<C>() {
  return { ...getColorPickerProps<C>(), ...getGridEditorCommonProps() };
}
