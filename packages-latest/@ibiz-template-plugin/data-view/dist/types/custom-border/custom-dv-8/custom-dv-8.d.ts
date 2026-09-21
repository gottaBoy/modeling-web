import { PropType, Ref } from 'vue';

export declare const CustomDV8: import('vue').DefineComponent<{
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
    dur: {
        type: NumberConstructor;
        default: number;
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
    offsetY: number;
    color: string[];
    offsetX: number;
    dur: number;
}, {}>;
