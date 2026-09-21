import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取步进器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getStepperProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: [String, Number],
  };
}

/**
 * @description 获取表格步进器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridStepperProps<C>() {
  return { ...getStepperProps<C>(), ...getGridEditorCommonProps() };
}
