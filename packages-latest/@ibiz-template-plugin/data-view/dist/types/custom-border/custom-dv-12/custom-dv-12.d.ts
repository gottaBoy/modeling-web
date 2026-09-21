import { PropType, Ref } from 'vue';

export declare const CustomDV12: import('vue').DefineComponent<{
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
    renderBorder: () => import("vue/jsx-runtime").JSX.Element;
    ns: Namespace;
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
}>>, {
    offsetY: number;
    color: string[];
    offsetX: number;
}, {}>;
