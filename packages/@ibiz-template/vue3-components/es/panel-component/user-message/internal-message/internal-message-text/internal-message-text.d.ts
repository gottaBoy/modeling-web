import { PropType } from 'vue';
import { IInternalMessage } from '@ibiz-template/core';
import './internal-message-text.scss';
import { InternalMessageTextProvider } from './internal-message-text.provider';
export declare const InternalMessageText: import("vue").DefineComponent<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<InternalMessageTextProvider>;
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
        type: PropType<InternalMessageTextProvider>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
}, {}, {}>;
