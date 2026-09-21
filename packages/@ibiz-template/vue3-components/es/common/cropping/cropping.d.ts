import { PropType, Ref } from 'vue';
import './cropping.scss';
export declare const IBizCropping: import("vue").DefineComponent<{
    img: {
        type: PropType<IData>;
    };
    url: {
        type: StringConstructor;
    };
    cropareaWidth: {
        type: NumberConstructor;
        default: number;
    };
    cropareaHeight: {
        type: NumberConstructor;
        default: number;
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    cropImgUrl: import("vue").ComputedRef<string>;
    scaleNumber: Ref<number>;
    style: import("vue").ComputedRef<IData>;
    uuid: string;
    imgRef: Ref<any>;
    onReduce: () => void;
    onAdd: () => void;
    onMouseDown: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onCancel: () => void;
    onConfirm: () => Promise<void>;
    onWheel: (e: WheelEvent) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    img: {
        type: PropType<IData>;
    };
    url: {
        type: StringConstructor;
    };
    cropareaWidth: {
        type: NumberConstructor;
        default: number;
    };
    cropareaHeight: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    cropareaWidth: number;
    cropareaHeight: number;
}, {}>;
