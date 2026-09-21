import { getEditorProps, getGridEditorCommonProps, getEditorEmits } from './common.mjs';

"use strict";
function getMarkDownProps() {
  return {
    ...getEditorProps(),
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: { type: Object, required: false },
    /**
     * @description 编辑器控制器对象
     */
    controller: { type: Object, required: false },
    /**
     * @description 是否禁用
     */
    disabled: { type: Boolean, required: false },
    /**
     * @description 切片视图
     */
    chunkView: { type: String, required: false },
    /**
     * @description 切片实体
     */
    chunkEntity: { type: String, required: false },
    /**
     * @description 上下文
     */
    context: { type: Object, required: false },
    /**
     * @description 部件
     */
    ctrl: { type: Object, required: false },
    /**
     * @description 视图
     */
    view: { type: Object, required: false }
  };
}
function getGridMarkDownProps() {
  return { ...getMarkDownProps(), ...getGridEditorCommonProps() };
}
function getMarkDownEmits() {
  return {
    ...getEditorEmits()
  };
}

export { getGridMarkDownProps, getMarkDownEmits, getMarkDownProps };
