import { PropType } from 'vue';
import { IPortalAsyncAction } from '@ibiz-template/core';
import './async-action.scss';
import { IAsyncActionProvider } from '@ibiz-template/runtime';
export declare const AsyncAction: import("vue").DefineComponent<{
    action: {
        type: PropType<IPortalAsyncAction>;
        required: true;
    };
    provider: {
        type: PropType<IAsyncActionProvider>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    showErrorInfo: import("vue").ComputedRef<boolean | "">;
    clickable: import("vue").ComputedRef<boolean>;
    actionstate: import("vue").ComputedRef<10 | 20 | 30 | 40>;
    progressText: import("vue").ComputedRef<string>;
    onClick: (event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    action: {
        type: PropType<IPortalAsyncAction>;
        required: true;
    };
    provider: {
        type: PropType<IAsyncActionProvider>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
}, {}, {}>;
