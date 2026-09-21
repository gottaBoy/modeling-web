import { PropType } from 'vue';
import { IDBFilterPortletPart } from '@ibiz/model-core';
import { FilterPortletController } from '@ibiz-template/runtime';
import './filter-portlet.scss';
export declare const FilterPortlet: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IDBFilterPortletPart>;
        required: true;
    };
    controller: {
        type: typeof FilterPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    handleReset: () => void;
    handleSearch: () => void;
    renderFilter: () => (import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined)[] | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IDBFilterPortletPart>;
        required: true;
    };
    controller: {
        type: typeof FilterPortletController;
        required: true;
    };
}>>, {}, {}>;
