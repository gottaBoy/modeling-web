import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取上传props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getUploadProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
  };
}

/**
 * @description 获取表格上传props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridUploadProps<C>() {
  return { ...getUploadProps<C>(), ...getGridEditorCommonProps() };
}
