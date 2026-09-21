import { PropType } from 'vue';

export declare const CustomDV10: import('vue').DefineComponent<{
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
    customDv10: import('vue').Ref<any, any>;
    mergedColor: import('vue').ComputedRef<string[]>;
    renderBorder: () => import("vue/jsx-runtime").JSX.Element;
    backgroundColor: string;
    padding: import('vue').Ref<number, number>;
    offsety: import('vue').Ref<number, number>;
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
