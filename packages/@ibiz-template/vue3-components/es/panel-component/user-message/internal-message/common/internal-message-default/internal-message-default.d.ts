import { PropType } from 'vue';
import { IInternalMessage } from '@ibiz-template/core';
import './internal-message-default.scss';
import { IInternalMessageProvider } from '@ibiz-template/runtime';
export declare const InternalMessageDefault: import("vue").DefineComponent<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<IInternalMessageProvider>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<IInternalMessageProvider>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
}, {}, {}>;
