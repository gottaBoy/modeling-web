import { PropType, Ref } from 'vue';
import { IDBPortletPart } from '@ibiz/model-core';
import './filter-portlet-design.scss';
import { IModalData } from '@ibiz-template/runtime';
export declare const IBizFilterPortletDesign: import("vue").DefineComponent<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    viewParams: {
        type: PropType<IParams>;
        required: true;
    };
    filter: {
        type: PropType<IData>;
    };
    items: {
        type: PropType<IDBPortletPart[]>;
        default: () => never[];
    };
    dashboardStyle: {
        type: StringConstructor;
    };
    dismiss: {
        type: PropType<(_data?: IModalData) => void>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    loaded: Ref<boolean>;
    formRef: Ref<any>;
    renderRightContent: () => JSX.Element;
    renderLeftContent: () => JSX.Element;
    renderCondition: () => JSX.Element;
    renderFooter: () => JSX.Element;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("lisTSelect" | "formChange")[], "lisTSelect" | "formChange", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    context: {
        type: PropType<IContext>;
        required: true;
    };
    viewParams: {
        type: PropType<IParams>;
        required: true;
    };
    filter: {
        type: PropType<IData>;
    };
    items: {
        type: PropType<IDBPortletPart[]>;
        default: () => never[];
    };
    dashboardStyle: {
        type: StringConstructor;
    };
    dismiss: {
        type: PropType<(_data?: IModalData) => void>;
        required: true;
    };
}>> & {
    onLisTSelect?: ((...args: any[]) => any) | undefined;
    onFormChange?: ((...args: any[]) => any) | undefined;
}, {
    items: IDBPortletPart[];
}, {}>;
