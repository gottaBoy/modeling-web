import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取滑动输入条props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getSliderProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格滑动输入条props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridSliderProps<C>() {
  return { ...getSliderProps<C>(), ...getGridEditorCommonProps() };
}
