import { PropType } from 'vue';
import { IInternalMessage } from '@ibiz-template/core';
import './internal-message-json.scss';
import { InternalMessageJSONtProvider } from './internal-message-json.provider';
export declare const InternalMessageJSON: import("vue").DefineComponent<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<InternalMessageJSONtProvider>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    jsonContent: import("vue").ComputedRef<IData | null>;
    toolbarItems: import("vue").ComputedRef<{
        icon: string;
        key: string;
        tooltip: string;
    }[] | undefined>;
    redirectUrl: import("vue").ComputedRef<any>;
    onToolbarClick: (key: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: {
        type: PropType<IInternalMessage>;
        required: true;
    };
    provider: {
        type: PropType<InternalMessageJSONtProvider>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
}, {}, {}>;
