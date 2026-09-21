import { IPortalAsyncAction } from '@ibiz-template/core';
import { IModal } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './async-action-preview.scss';
export declare const AsyncActionPreview: import("vue").DefineComponent<{
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
    info: {
        title: string;
        beginTime: string;
        endTime: string;
        total: number;
        success: number;
        error: number;
        errorDetails: {
            row: number;
            reason: string;
        }[];
        errorFileUrl: string;
    };
    onClose: () => void;
    onDownLoad: () => void;
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
