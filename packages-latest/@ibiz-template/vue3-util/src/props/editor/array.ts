import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取数组编辑器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getArrayProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [Array<string>, Array<number>],
  };
}

/**
 * @description 获取表格数组编辑器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridArrayProps<C>() {
  return { ...getArrayProps<C>(), ...getGridEditorCommonProps() };
}
