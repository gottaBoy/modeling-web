export declare const IBizScreenPortlet: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDBPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import('@ibiz-template/runtime').PortletPartController;
        required: true;
    };
}, {
    c: import('./screen-portlet.controller').ScreenPortletController;
    ns: import('@ibiz-template/core').Namespace;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IDBPortletPart>;
        required: true;
    };
    controller: {
        type: typeof import('@ibiz-template/runtime').PortletPartController;
        required: true;
    };
}>>, {}, {}>>;
