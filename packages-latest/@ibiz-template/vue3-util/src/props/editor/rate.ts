import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取评分器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getRateProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格评分器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridRateProps<C>() {
  return { ...getRateProps<C>(), ...getGridEditorCommonProps() };
}
