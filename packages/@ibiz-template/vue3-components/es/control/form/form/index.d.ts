export declare const IBizFormControl: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").FormController<import("@ibiz/model-core").IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>>;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    c: import("@ibiz-template/runtime").FormController<import("@ibiz/model-core").IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>;
    FormDetail: {
        (_props: {
            modelData: import("@ibiz/model-core").IDEFormDetail | import("@ibiz/model-core").IDEFormDetail[];
        }): (import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[] | undefined)[];
        props: string[];
    };
    slotProps: IData;
    renderByDetailType: (detail: import("@ibiz/model-core").IDEFormDetail) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: import("vue").PropType<import("@ibiz-template/runtime").FormController<import("@ibiz/model-core").IDEForm, import("@ibiz-template/runtime").IFormState, import("@ibiz-template/runtime").IFormEvent>>;
        required: true;
    };
}>>, {}, {}>>;
export default IBizFormControl;
