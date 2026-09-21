export * from './chart-portlet';
export declare const IBizChartPortlet: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ChartPortletController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    chart: import("@ibiz/model-core").IControl | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IDBSysPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").ChartPortletController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizChartPortlet;
