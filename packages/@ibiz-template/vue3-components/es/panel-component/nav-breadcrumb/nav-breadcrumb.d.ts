import { PropType } from 'vue';
import { IPanelRawItem } from '@ibiz/model-core';
import { NavBreadcrumbController } from './nav-breadcrumb.controller';
import './nav-breadcrumb.scss';
export interface dropdownAction {
    text: string;
    value?: string;
}
export declare const NavBreadcrumb: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavBreadcrumbController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: NavBreadcrumbController;
    items: import("vue").ComputedRef<import("./nav-breadcrumb.state").BreadcrumbMsg[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof NavBreadcrumbController;
        required: true;
    };
}>>, {}, {}>;
