import { PropType } from 'vue';
import { IAsyncActionController } from '@ibiz-template/runtime';
import './async-action-tab.scss';
export declare const AsyncActionTab: import("vue").DefineComponent<{
    controller: {
        type: PropType<IAsyncActionController>;
        required: true;
    };
    showPopover: {
        type: BooleanConstructor;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    allItems: import("vue").Ref<{
        asyncacitonid: string;
        asyncacitonname: string;
        fulltopictag: string;
        srfdcid: string;
        dcsystemid: string;
        actiontype: string;
        actionstate: 10 | 20 | 30 | 40;
        actionresult?: unknown;
        stepinfo?: string | undefined;
        completionrate?: number | undefined;
        asyncresultdownloadurl?: string | undefined;
        actionparam?: unknown;
        actionparam2?: unknown;
        actionparam3?: unknown;
        actionparam4?: unknown;
        begintime: string;
        endtime: string;
        createman: string;
        createdate: string;
        updateman: string;
        updatedate: string;
    }[]>;
    hiddenPopover: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hiddenPopover: () => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: PropType<IAsyncActionController>;
        required: true;
    };
    showPopover: {
        type: BooleanConstructor;
        required: true;
    };
}>> & {
    onHiddenPopover?: (() => any) | undefined;
}, {}, {}>;
