import { PropType, Ref } from 'vue';
import { IDashboard } from '@ibiz/model-core';
import { IControlProvider } from '@ibiz-template/runtime';

export declare const ScreenDashboard: import('vue').DefineComponent<{
    modelData: {
        type: PropType<IDashboard>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}, {
    ns: import('@ibiz-template/core').Namespace;
    tempModelData: Ref<IDashboard, IDashboard>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: PropType<IDashboard>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        default: () => {};
    };
    provider: {
        type: PropType<IControlProvider>;
    };
}>>, {
    params: IParams;
}, {}>;
