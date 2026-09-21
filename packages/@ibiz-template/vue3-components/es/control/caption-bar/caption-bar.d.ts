import { PropType } from 'vue';
import { ICaptionBar } from '@ibiz/model-core';
import { CaptionBarController, IControlProvider } from '@ibiz-template/runtime';
import './caption-bar.scss';
export declare const CaptionBarControl: import("vue").DefineComponent<{
    modelData: {
        type: PropType<ICaptionBar>;
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
    c: CaptionBarController;
    ns: import("@ibiz-template/core").Namespace;
    showTotal: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<ICaptionBar>;
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
