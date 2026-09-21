import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取数值框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getInputNumberProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: Number,
  };
}

/**
 * @description 获取表格数值框props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridInputNumberProps<C>() {
  return { ...getInputNumberProps<C>(), ...getGridEditorCommonProps() };
}
