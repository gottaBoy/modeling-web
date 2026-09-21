import { PropType } from 'vue';
import './devtool-select.scss';
export declare const DevtoolSelect: import("vue").DefineComponent<{
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    value: {
        type: PropType<string>;
    };
    width: {
        type: PropType<number>;
        default: number;
    };
    options: {
        type: PropType<string[]>;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    editorRef: import("vue").Ref<any>;
    isShow: import("vue").Ref<boolean>;
    curLabel: import("vue").Ref<string>;
    curValue: import("vue").Ref<string>;
    options: import("vue").Ref<string[]>;
    showOption: () => void;
    provideData: {
        isShow: import("vue").Ref<boolean>;
        curLabel: import("vue").Ref<string>;
        curValue: import("vue").Ref<string>;
        options: import("vue").Ref<string[]>;
    };
    renderSvg: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    value: {
        type: PropType<string>;
    };
    width: {
        type: PropType<number>;
        default: number;
    };
    options: {
        type: PropType<string[]>;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    placeholder: string;
    width: number;
}, {}>;
export default DevtoolSelect;
