import { PropType } from 'vue';

export declare const CustomDV11: import('vue').DefineComponent<{
    offsetX: {
        style: NumberConstructor;
        default: number;
    };
    offsetY: {
        style: NumberConstructor;
        default: number;
    };
    color: {
        type: PropType<string[]>;
        default: () => never[];
    };
    titleWidth: {
        type: NumberConstructor;
        default: number;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    customDv11: import('vue').Ref<any, any>;
    renderBorder: () => import("vue/jsx-runtime").JSX.Element;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    offsetX: {
        style: NumberConstructor;
        default: number;
    };
    offsetY: {
        style: NumberConstructor;
        default: number;
    };
    color: {
        type: PropType<string[]>;
        default: () => never[];
    };
    titleWidth: {
        type: NumberConstructor;
        default: number;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    title: string;
    offsetY: number;
    color: string[];
    offsetX: number;
    titleWidth: number;
}, {}>;
