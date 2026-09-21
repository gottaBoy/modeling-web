import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取文本框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getInputProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格文本框props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridInputProps<C>() {
  return { ...getInputProps<C>(), ...getGridEditorCommonProps() };
}
