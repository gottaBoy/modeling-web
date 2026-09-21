import { PropType } from 'vue';
import { IInternalMessage } from '@ibiz-template/core';
import './internal-message-html.scss';
import { InternalMessageHTMLtProvider } from './internal-message-html.provider';
export declare const InternalMessageHTML: import("vue").DefineComponent<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<InternalMessageHTMLtProvider>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    msgContent: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<InternalMessageHTMLtProvider>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
}, {}, {}>;
