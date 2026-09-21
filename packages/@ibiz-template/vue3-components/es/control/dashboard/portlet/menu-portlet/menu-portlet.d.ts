import { PropType } from 'vue';
import { IAppMenu, IDBAppMenuPortletPart } from '@ibiz/model-core';
import { MenuPortletController } from '@ibiz-template/runtime';
export declare const MenuPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDBAppMenuPortletPart>;
        required: true;
    };
    controller: {
        type: typeof MenuPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    menu: IAppMenu | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDBAppMenuPortletPart>;
        required: true;
    };
    controller: {
        type: typeof MenuPortletController;
        required: true;
    };
}>>, {}, {}>;
