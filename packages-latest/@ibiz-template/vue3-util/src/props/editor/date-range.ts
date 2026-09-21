import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取时间范围props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getDateRangeProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格时间范围props
 *
 * @export
 * @template C
 * @returns {*}
 */
export function getGridDateRangeProps<C>() {
  return { ...getDateRangeProps<C>(), ...getGridEditorCommonProps() };
}
