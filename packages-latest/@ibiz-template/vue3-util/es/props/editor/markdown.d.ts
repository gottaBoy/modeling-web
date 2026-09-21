import { PropType } from 'vue';
import { IControlController, IViewController } from '@ibiz-template/runtime';
/**
 * @description 获取MARKDOWN编辑器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export declare function getMarkDownProps<C>(): {
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: {
        type: ObjectConstructor;
        required: boolean;
    };
    /**
     * @description 编辑器控制器对象
     */
    controller: {
        type: ObjectConstructor;
        required: boolean;
    };
    /**
     * @description 是否禁用
     */
    disabled: {
        type: BooleanConstructor;
        required: boolean;
    };
    /**
     * @description 切片视图
     */
    chunkView: {
        type: StringConstructor;
        required: boolean;
    };
    /**
     * @description 切片实体
     */
    chunkEntity: {
        type: StringConstructor;
        required: boolean;
    };
    /**
     * @description 上下文
     */
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: boolean;
    };
    /**
     * @description 部件
     */
    ctrl: {
        type: PropType<IControlController<import("@ibiz/model-core").IControl, import("@ibiz-template/runtime").IControlState, import("@ibiz-template/runtime").IControlEvent>>;
        required: boolean;
    };
    /**
     * @description 视图
     */
    view: {
        type: PropType<IViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>>;
        required: boolean;
    };
    value: StringConstructor;
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
 * @description 获取表格MARKDOWN编辑器props
 * @export
 * @template C
 * @returns {*}
 */
export declare function getGridMarkDownProps<C>(): {
    hasError: {
        type: BooleanConstructor;
    };
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: {
        type: ObjectConstructor;
        required: boolean;
    };
    /**
     * @description 编辑器控制器对象
     */
    controller: {
        type: ObjectConstructor;
        required: boolean;
    };
    /**
     * @description 是否禁用
     */
    disabled: {
        type: BooleanConstructor;
        required: boolean;
    };
    /**
     * @description 切片视图
     */
    chunkView: {
        type: StringConstructor;
        required: boolean;
    };
    /**
     * @description 切片实体
     */
    chunkEntity: {
        type: StringConstructor;
        required: boolean;
    };
    /**
     * @description 上下文
     */
    context: {
        type: PropType<import("@ibiz-template/core").IApiContext>;
        required: boolean;
    };
    /**
     * @description 部件
     */
    ctrl: {
        type: PropType<IControlController<import("@ibiz/model-core").IControl, import("@ibiz-template/runtime").IControlState, import("@ibiz-template/runtime").IControlEvent>>;
        required: boolean;
    };
    /**
     * @description 视图
     */
    view: {
        type: PropType<IViewController<import("@ibiz/model-core").IAppView, import("@ibiz-template/runtime").IViewState, import("@ibiz-template/runtime").IViewEvent>>;
        required: boolean;
    };
    value: StringConstructor;
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
 * @description 获取MD编辑器通用emits
 * @export
 * @returns {*}
 * @editoremits
 */
export declare function getMarkDownEmits(): {
    change: (_value: unknown, _name?: string | undefined, _ignore?: boolean | undefined) => boolean;
    blur: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    focus: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    enter: (_event?: import("@ibiz-template/core").IApiData | undefined) => boolean;
    infoTextChange: (_text: string) => boolean;
    customAction: (_value: {
        tag: string;
        data: import("@ibiz-template/core").IApiData[];
    }) => boolean;
};
//# sourceMappingURL=markdown.d.ts.map