import { PropType } from 'vue';

export declare const CustomDecoration4: import('vue').DefineComponent<{
    color: {
        type: PropType<string[]>;
        default: () => never[];
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    dur: {
        type: NumberConstructor;
        default: number;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    customDecoration4: import('vue').Ref<any, any>;
    renderBorder: () => import("vue/jsx-runtime").JSX.Element;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    color: {
        type: PropType<string[]>;
        default: () => never[];
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    dur: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    reverse: boolean;
    color: string[];
    dur: number;
}, {}>;
