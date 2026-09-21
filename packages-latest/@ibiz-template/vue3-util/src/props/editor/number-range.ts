import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取数值范围props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getNumberRangeProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格数值范围的props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridNumberRangeProps<C>() {
  return { ...getNumberRangeProps<C>(), ...getGridEditorCommonProps() };
}
