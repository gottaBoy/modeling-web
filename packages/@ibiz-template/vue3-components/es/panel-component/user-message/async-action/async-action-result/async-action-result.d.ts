import { IPortalAsyncAction } from '@ibiz-template/core';
import { IModal } from '@ibiz-template/runtime';
import { PropType } from 'vue';
export declare const AsyncActionResult: import("vue").DefineComponent<{
    asyncAction: {
        type: PropType<IPortalAsyncAction>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    message: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    asyncAction: {
        type: PropType<IPortalAsyncAction>;
        required: true;
    };
    modal: {
        type: PropType<IModal>;
        required: true;
    };
}>>, {}, {}>;
