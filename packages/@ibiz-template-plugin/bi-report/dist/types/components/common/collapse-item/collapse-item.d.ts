import { PropType } from 'vue';
/** BI报表折叠组件 */
declare const _default: import("vue").DefineComponent<{
    label: {
        type: PropType<string>;
        required: true;
    };
    enableShowEmptyData: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    enableRemove: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    enableEditMode: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    enableSwitch: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    switchValue: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    name: {
        type: PropType<string | number>;
        required: true;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    editMode: {
        type: StringConstructor;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    visible: import("vue").Ref<boolean>;
    showEmptyDataSvg: () => JSX.Element;
    editModeSvg: () => JSX.Element;
    removeSvg: () => JSX.Element;
    checkSvg: () => JSX.Element;
    ClickSvg: (event: MouseEvent, mode: string, value?: string) => void;
    switchChange: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("switchChange" | "svgClick")[], "switchChange" | "svgClick", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    label: {
        type: PropType<string>;
        required: true;
    };
    enableShowEmptyData: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    enableRemove: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    enableEditMode: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    enableSwitch: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    switchValue: {
        type: PropType<Boolean>;
        required: false;
        default: boolean;
    };
    name: {
        type: PropType<string | number>;
        required: true;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    editMode: {
        type: StringConstructor;
    };
}>> & {
    onSwitchChange?: ((...args: any[]) => any) | undefined;
    onSvgClick?: ((...args: any[]) => any) | undefined;
}, {
    enableRemove: Boolean;
    required: boolean;
    enableSwitch: Boolean;
    enableShowEmptyData: Boolean;
    enableEditMode: Boolean;
    switchValue: Boolean;
}, {}>;
export default _default;
