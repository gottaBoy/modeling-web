import { PropType, Ref } from 'vue';
import './carousel-card.scss';
export declare const IBizCarouselCard: import("vue").DefineComponent<{
    swipeData: {
        type: PropType<IData[]>;
        required: true;
    };
    isAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeSpan: {
        type: NumberConstructor;
        default: number;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    btnClick: (pos: string) => void;
    mainDom: Ref<any>;
    listDom: Ref<any>;
    imgWidth: Ref<number>;
    resImgArr: import("vue").ComputedRef<IData[]>;
    dotClick: (targetIndex: number) => void;
    nowIndex: Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    swipeData: {
        type: PropType<IData[]>;
        required: true;
    };
    isAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeSpan: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    isAuto: boolean;
    timeSpan: number;
}, {}>;
