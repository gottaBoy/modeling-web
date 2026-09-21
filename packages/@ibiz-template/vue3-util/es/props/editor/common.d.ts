import { PropType } from 'vue';
import { RequiredProp } from '../common';
/**
 * 获取编辑器通用props
 *
 * @author lxm
 * @date 2022-11-01 19:11:04
 * @export
 * @template C
 * @returns {*}
 */
export declare function getEditorProps<C>(): {
    value: StringConstructor;
    controller: RequiredProp<PropType<C>, undefined, undefined>;
    data: RequiredProp<PropType<IData>, undefined, undefined>;
    disabled: {
        type: BooleanConstructor;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    overflowMode: {
        type: StringConstructor;
    };
    controlParams: {
        type: ObjectConstructor;
        required: boolean;
    };
};
/**
 * 获取编辑器通用emits
 *
 * @author lxm
 * @date 2022-11-03 19:11:04
 * @export
 * @template V
 * @returns {*}
 */
export declare function getEditorEmits<V>(): {
    /** 值变更事件 */
    change: (_value: V, _name?: string, _ignore?: boolean) => boolean;
    /** 失焦事件 */
    blur: (_event?: IData) => boolean;
    /** 聚焦事件 */
    focus: (_event?: IData) => boolean;
    /** 回车事件 */
    enter: (_event?: IData) => boolean;
    /** 信息文本变更事件 */
    infoTextChange: (_text: string) => boolean;
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