import { PropType } from 'vue';
import { IModal } from '@ibiz-template/runtime';
import { AppBIPeriodData } from '../../../interface';
export declare const BITimeSelect: import("vue").DefineComponent<{
    value: {
        type: PropType<AppBIPeriodData>;
        default: () => void;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    renderEditor: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined;
    onOK: () => void;
    onCancel: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<AppBIPeriodData>;
        default: () => void;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
    context: {
        type: PropType<IContext>;
        required: true;
    };
    params: {
        type: PropType<IParams>;
        required: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    value: AppBIPeriodData;
}, {}>;
