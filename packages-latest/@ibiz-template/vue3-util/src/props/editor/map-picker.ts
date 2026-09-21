import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取地图选择器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getMapPickerProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
  };
}

/**
 * @description 获取表格地图选择器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridMapPickerProps<C>() {
  return { ...getMapPickerProps<C>(), ...getGridEditorCommonProps() };
}
