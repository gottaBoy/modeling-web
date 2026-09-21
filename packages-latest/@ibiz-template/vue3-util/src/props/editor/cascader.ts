import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取级联选择器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getCascaderProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
  };
}

/**
 * @description 获取表格级联选择器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridCascaderProps<C>() {
  return { ...getCascaderProps<C>(), ...getGridEditorCommonProps() };
}
