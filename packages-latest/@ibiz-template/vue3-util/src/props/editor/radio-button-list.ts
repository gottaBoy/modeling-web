import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取单选框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getRadioProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格单选框props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridRadioProps<C>() {
  return { ...getRadioProps<C>(), ...getGridEditorCommonProps() };
}
