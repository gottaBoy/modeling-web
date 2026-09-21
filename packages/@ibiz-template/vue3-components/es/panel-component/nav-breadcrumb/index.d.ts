export * from './nav-breadcrumb.controller';
export * from './nav-breadcrumb.state';
export declare const IBizNavBreadcrumb: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./nav-breadcrumb.controller").NavBreadcrumbController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("./nav-breadcrumb.controller").NavBreadcrumbController;
    items: import("vue").ComputedRef<import("./nav-breadcrumb.state").BreadcrumbMsg[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("./nav-breadcrumb.controller").NavBreadcrumbController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizNavBreadcrumb;
