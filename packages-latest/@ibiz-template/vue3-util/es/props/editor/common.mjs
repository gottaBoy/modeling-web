import { RequiredProp } from '../common.mjs';

"use strict";
function getEditorProps() {
  return {
    /**
     * @description 编辑器值
     */
    value: String,
    /**
     * @description 编辑器控制器对象
     */
    controller: new RequiredProp(Object),
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: new RequiredProp(Object),
    /**
     * @description 是否禁用
     * @default false
     */
    disabled: { type: Boolean },
    /**
     * @description 是否只读
     * @default false
     */
    readonly: { type: Boolean, default: false },
    /**
     * @description 是否自动聚焦
     * @default false
     */
    autoFocus: { type: Boolean, default: false },
    /**
     * @description 单元格超出呈现模式，表格容器中使用，wrap 换行，高度自动增高；ellipsis 省略，出...，悬浮出tooltip
     */
    overflowMode: { type: String },
    /**
     * @description 容器控件参数，一般是指表单部件控件参数、表格控件参数、面板控件参数
     */
    controlParams: { type: Object, required: false }
  };
}
function getEditorEmits() {
  return {
    /**
     * @description 值变更事件
     */
    change: (_value, _name, _ignore) => true,
    /**
     * @description 失焦事件
     */
    blur: (_event) => true,
    /**
     * @description 聚焦事件
     */
    focus: (_event) => true,
    /**
     * @description 回车事件
     */
    enter: (_event) => true,
    /**
     * @description 信息文本变更事件
     */
    infoTextChange: (_text) => true,
    /**
     * @description 自定义行为事件，tag：行为标识，data：行为参数
     */
    customAction: (_value) => true
  };
}
function getGridEditorEmits() {
  return {
    /** 值变更事件 */
    change: (_value, _name, _ignore) => true,
    /** 是否正在操作事件 */
    rowSave: () => true
  };
}
function getGridEditorCommonProps() {
  return {
    hasError: {
      type: Boolean
    }
  };
}

export { getEditorEmits, getEditorProps, getGridEditorCommonProps, getGridEditorEmits };
