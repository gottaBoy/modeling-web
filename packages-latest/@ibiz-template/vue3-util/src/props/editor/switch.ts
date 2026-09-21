import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取开关props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getSwitchProps<C>() {
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
export function getGridSwitchProps<C>() {
  return { ...getSwitchProps<C>(), ...getGridEditorCommonProps() };
}
