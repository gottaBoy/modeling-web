/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropType } from 'vue';
import { RequiredProp } from '../common';

/**
 * @description 获取编辑器通用props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getEditorProps<C>() {
  return {
    /**
     * @description 编辑器值
     */
    value: String,
    /**
     * @description 编辑器控制器对象
     */
    controller: new RequiredProp(Object as PropType<C>),
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: new RequiredProp(Object as PropType<IData>),
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
    controlParams: { type: Object, required: false },
  };
}

/**
 * @description 获取编辑器通用emits
 * @export
 * @template V
 * @returns {*}
 * @editoremits
 */
export function getEditorEmits<V>() {
  return {
    /**
     * @description 值变更事件
     */
    change: (_value: V, _name?: string, _ignore?: boolean) => true,
    /**
     * @description 失焦事件
     */
    blur: (_event?: IData) => true,
    /**
     * @description 聚焦事件
     */
    focus: (_event?: IData) => true,
    /**
     * @description 回车事件
     */
    enter: (_event?: IData) => true,
    /**
     * @description 信息文本变更事件
     */
    infoTextChange: (_text: string) => true,
    /**
     * @description 自定义行为事件，tag：行为标识，data：行为参数
     */
    customAction: (_value: { tag: string; data: IData[] }) => true,
  };
}

/**
 * 获取表格列编辑器通用emits
 *
 * @author lxm
 * @date 2022-11-01 19:11:04
 * @export
 * @template V
 * @returns {*}
 */
export function getGridEditorEmits<V>() {
  return {
    /** 值变更事件 */
    change: (_value: V, _name?: string, _ignore?: boolean) => true,
    /** 是否正在操作事件 */
    rowSave: () => true,
  };
}

/**
 * 表格编辑器通用props
 *
 * @author lxm
 * @date 2022-11-02 10:11:02
 * @export
 * @returns {*}
 */
export function getGridEditorCommonProps() {
  return {
    hasError: {
      type: Boolean,
    },
  };
}
