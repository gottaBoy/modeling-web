export declare const IBizPanelStaticCarousel: import("@ibiz-template/vue3-util").TypeWithInstall<import("vue").DefineComponent<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    carouselData: import("vue").Ref<{
        id?: string | undefined;
        name?: string | undefined;
        imgUrl?: string | undefined;
        linkPath?: string | undefined;
        cssClass?: string | undefined;
    }[]>;
    isAuto: import("vue").Ref<boolean>;
    timeSpan: import("vue").Ref<number>;
    showMode: import("vue").Ref<"DEFAULT" | "CARD">;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: import("vue").PropType<import("@ibiz/model-core").IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof import("@ibiz-template/runtime").PanelItemController;
        required: true;
    };
}>>, {}, {}>>;
export default IBizPanelStaticCarousel;
