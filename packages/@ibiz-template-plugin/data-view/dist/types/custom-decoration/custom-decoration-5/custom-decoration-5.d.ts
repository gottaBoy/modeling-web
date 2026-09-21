import { PropType } from 'vue';

export declare const CustomDecoration5: import('vue').DefineComponent<{
    color: {
        type: PropType<string[]>;
        default: () => never[];
    };
    dur: {
        type: NumberConstructor;
        default: number;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    customDecoration5: import('vue').Ref<any, any>;
    renderBorder: () => import("vue/jsx-runtime").JSX.Element;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    color: {
        type: PropType<string[]>;
        default: () => never[];
    };
    dur: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    color: string[];
    dur: number;
}, {}>;
