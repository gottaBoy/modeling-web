import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取直接内容props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getRawProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number, Array],
  };
}

/**
 * @description 获取表格步进器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridRawProps<C>() {
  return { ...getRawProps<C>(), ...getGridEditorCommonProps() };
}
