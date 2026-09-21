import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取自动填充props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getAutoCompleteProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格自动完成props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridAutoCompleteProps<C>() {
  return { ...getAutoCompleteProps<C>(), ...getGridEditorCommonProps() };
}
