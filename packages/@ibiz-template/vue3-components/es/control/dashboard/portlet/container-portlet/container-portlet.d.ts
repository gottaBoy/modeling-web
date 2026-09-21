import { PropType } from 'vue';
import { IDBContainerPortletPart } from '@ibiz/model-core';
import { ContainerPortletController } from '@ibiz-template/runtime';
import './container-portlet.scss';
export declare const ContainerPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDBContainerPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ContainerPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDBContainerPortletPart>;
        required: true;
    };
    controller: {
        type: typeof ContainerPortletController;
        required: true;
    };
}>>, {}, {}>;
