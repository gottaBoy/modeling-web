import { PropType, Ref } from 'vue';

export declare const CustomDV6: import('vue').DefineComponent<{
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
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    renderBorder: () => import("vue/jsx-runtime").JSX.Element;
    ns: import('@ibiz-template/core').Namespace;
    myElement: Ref<any, any>;
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
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    reverse: boolean;
    offsetY: number;
    color: string[];
    offsetX: number;
}, {}>;
