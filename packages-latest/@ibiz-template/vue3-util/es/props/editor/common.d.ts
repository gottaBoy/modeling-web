import { PropType } from 'vue';
import { RequiredProp } from '../common';
/**
 * @description 获取编辑器通用props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getEditorProps<C>(): {
    /**
     * @description 编辑器值
     */
    value: StringConstructor;
    /**
     * @description 编辑器控制器对象
     */
    controller: RequiredProp<PropType<C>, undefined, undefined>;
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: RequiredProp<PropType<import("@ibiz-template/core").IApiData>, undefined, undefined>;
    /**
     * @description 是否禁用
     * @default false
     */
    disabled: {
        type: BooleanConstructor;
    };
    /**
     * @description 是否只读
     * @default false
     */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 是否自动聚焦
     * @default false
     */
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 单元格超出呈现模式，表格容器中使用，wrap 换行，高度自动增高；ellipsis 省略，出...，悬浮出tooltip
     */
    overflowMode: {
        type: StringConstructor;
    };
    /**
     * @description 容器控件参数，一般是指表单部件控件参数、表格控件参数、面板控件参数
     */
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
};
/**
 * @description 获取编辑器通用emits
 * @export
 * @template V
 * @returns {*}
 * @editoremits
 */
export declare function getEditorEmits<V>(): {
    /**
     * @description 值变更事件
     */
    change: (_value: V, _name?: string, _ignore?: boolean) => boolean;
    /**
     * @description 失焦事件
     */
    blur: (_event?: IData) => boolean;
    /**
     * @description 聚焦事件
     */
    focus: (_event?: IData) => boolean;
    /**
     * @description 回车事件
     */
    enter: (_event?: IData) => boolean;
    /**
     * @description 信息文本变更事件
     */
    infoTextChange: (_text: string) => boolean;
    /**
     * @description 自定义行为事件，tag：行为标识，data：行为参数
     */
    customAction: (_value: {
        tag: string;
        data: IData[];
    }) => boolean;
};
/**
 * 获取表格列编辑器通用emits
 *
 * @author lxm
 * @date 2022-11-01 19:11:04
 * @export
 * @template V
 * @returns {*}
 */
export declare function getGridEditorEmits<V>(): {
    /** 值变更事件 */
    change: (_value: V, _name?: string, _ignore?: boolean) => boolean;
    /** 是否正在操作事件 */
    rowSave: () => boolean;
};
/**
 * 表格编辑器通用props
 *
 * @author lxm
 * @date 2022-11-02 10:11:02
 * @export
 * @returns {*}
 */
export declare function getGridEditorCommonProps(): {
    hasError: {
        type: BooleanConstructor;
    };
};
//# sourceMappingURL=common.d.ts.map