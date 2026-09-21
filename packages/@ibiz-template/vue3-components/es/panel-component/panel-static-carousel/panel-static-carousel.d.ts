import { PanelItemController } from '@ibiz-template/runtime';
import { IPanelRawItem } from '@ibiz/model-core';
import { PropType, Ref } from 'vue';
import './panel-static-carousel.scss';
export declare const PanelStaticCarousel: import("vue").DefineComponent<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    carouselData: Ref<{
        id?: string | undefined;
        name?: string | undefined;
        imgUrl?: string | undefined;
        linkPath?: string | undefined;
        cssClass?: string | undefined;
    }[]>;
    isAuto: Ref<boolean>;
    timeSpan: Ref<number>;
    showMode: Ref<"DEFAULT" | "CARD">;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelData: {
        type: PropType<IPanelRawItem>;
        required: true;
    };
    controller: {
        type: typeof PanelItemController;
        required: true;
    };
}>>, {}, {}>;
