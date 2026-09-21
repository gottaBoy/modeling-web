import { PropType } from 'vue';
import { IUIActionGroupDetail } from '@ibiz/model-core';
import { ActionBarPortletController } from '@ibiz-template/runtime';
export declare const ActionBarPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ActionBarPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    onActionClick: (detail: IUIActionGroupDetail, event: MouseEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ActionBarPortletController;
        required: true;
    };
}>>, {}, {}>;
