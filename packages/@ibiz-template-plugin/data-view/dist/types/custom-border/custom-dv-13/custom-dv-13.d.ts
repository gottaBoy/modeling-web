import { PropType } from 'vue';

export declare const CustomDV13: import('vue').DefineComponent<{
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
}, {
    ns: import('@ibiz-template/core').Namespace;
    customDv13: import('vue').Ref<any, any>;
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
}>>, {
    offsetY: number;
    color: string[];
    offsetX: number;
}, {}>;
