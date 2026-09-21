import { FormMDCtrlFormController } from '@ibiz-template/runtime';
import { PropType } from 'vue';
import './mdctrl-container2.scss';
export declare const MDCtrlContainer2: import("vue").DefineComponent<{
    controller: {
        type: typeof FormMDCtrlFormController;
        required: true;
    };
    items: {
        type: PropType<IData[]>;
        default: () => never[];
    };
}, {
    ns: import("@ibiz-template/core").Namespace;
    currentItem: import("vue").Ref<string>;
    draggingKey: import("vue").Ref<string>;
    container: import("vue").Ref<IData | undefined>;
    isShowLeftArrow: import("vue").Ref<boolean>;
    isShowRightArrow: import("vue").Ref<boolean>;
    isShowBorder: import("vue").Ref<boolean>;
    handleSelect: (e: MouseEvent, item: IData) => void;
    handleAdd: (e: MouseEvent) => void;
    handleRemove: (e: MouseEvent, item: IData) => Promise<void>;
    handleArrowClick: (e: MouseEvent, direction: 'left' | 'right') => void;
    handleDragStart: (item: IData) => void;
    handleDragEnd: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    controller: {
        type: typeof FormMDCtrlFormController;
        required: true;
    };
    items: {
        type: PropType<IData[]>;
        default: () => never[];
    };
}>>, {
    items: IData[];
}, {}>;
