import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取ip框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getInputIpProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
  };
}

/**
 * @description 获取表格ip框props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridInputIpProps<C>() {
  return { ...getInputIpProps<C>(), ...getGridEditorCommonProps() };
}
