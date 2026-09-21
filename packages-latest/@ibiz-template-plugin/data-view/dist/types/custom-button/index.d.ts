export declare const IBizCustomButton: import('@ibiz-template/vue3-util').TypeWithInstall<import('vue').DefineComponent<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import('./custom-button.controller').CustomBtnController;
        required: true;
    };
}, {
    ns: Namespace;
    classArr: import('vue').ComputedRef<(string | false)[]>;
    tempStyle: import('vue').Ref<string, string>;
    content: import('vue').Ref<string | number | undefined, string | number | undefined>;
    svgShape: import('vue').Ref<string, string>;
    svgStyle: import('vue').Ref<{}, {}>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelData: {
        type: import('vue').PropType<import('@ibiz/model-core').IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import('./custom-button.controller').CustomBtnController;
        required: true;
    };
}>>, {}, {}>>;
